import cron from 'node-cron';
import User from '../models/user.model.js';
import DailyHistory from '../models/dailyHistory.model.js';

/**
 * Daily reset scheduler
 * Runs every hour to check and reset users at their local midnight (00:00)
 * Resets:
 * - dailyCalories to 0
 * - favoriteFoods[].quantity to 0
 * 
 * Does NOT reset:
 * - bodyData (calorie calculator values)
 * - favoriteFoods items themselves (name, calories)
 */

// Set to true for testing - will reset every minute instead of only at midnight (also switch line 21 and 22)
const TESTING_MODE = false;

export const startDailyResetScheduler = () => {
  // cron.schedule('*/1 * * * *', async () => {
  cron.schedule('0 * * * *', async () => {
    try {
      const now = new Date();
      const users = await User.find({});
      let usersReset = 0;
      let foodQuantityReset = 0;

      for(const user of users) {
        // Get the current time in the user's timezone
        const userTimezone = user.timezone || 'America/Toronto';
        
        try {
          // Most reliable method: use formatToParts to get structured time components
          // This avoids string parsing issues
          const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: userTimezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          });

          const parts = formatter.formatToParts(now);
          const userHour = parseInt(parts.find(part => part.type === 'hour')?.value || '0', 10);
          const userMinute = parseInt(parts.find(part => part.type === 'minute')?.value || '0', 10);

          // Debug logging (remove in production or make conditional)
          if (userHour === 0 || userMinute === 0) {
            const timeString = `${userHour.toString().padStart(2, '0')}:${userMinute.toString().padStart(2, '0')}`;
            console.log(`[DEBUG] User ${user.username} (${userTimezone}): Current time is ${timeString} (parsed: ${userHour}:${userMinute})`);
          }

          // In testing mode: reset every minute (whenever scheduler runs)
          // In production: reset only at midnight (00:00)
          const shouldReset = TESTING_MODE 
            ? true  // Reset every minute for testing
            : (userHour === 0 && userMinute === 0);  // Reset only at midnight for production

          if(shouldReset) {
            // Get the date in the user's timezone
            const dateFormatter = new Intl.DateTimeFormat('en-CA', {
              timeZone: userTimezone,
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            
            // Get maintain calories and daily calories before resetting
            const maintainCalories = user.bodyData?.calories?.maintain || 0;
            const dailyCalories = user.dailyCalories || 0;
            
            // Save to history - only save if there's actual data to preserve
            // This prevents creating empty history entries that get filtered out
            if (dailyCalories > 0 || maintainCalories > 0) {
              try {
                let historyDate;
                if (TESTING_MODE) {
                  // In testing mode: normalize to minute-level granularity
                  // Round down to the current minute to ensure consistent date matching
                  const normalizedDate = new Date(now);
                  normalizedDate.setSeconds(0, 0); // Round down to minute
                  historyDate = normalizedDate;
                } else {
                  // In production: save data for the day that just ended (yesterday at midnight)
                  const dateToUse = (userHour === 0 && userMinute === 0) 
                    ? new Date(now.getTime() - 24 * 60 * 60 * 1000) 
                    : now;
                  const historyDateString = dateFormatter.format(dateToUse);
                  historyDate = new Date(historyDateString + 'T00:00:00');
                }
                
                // Use upsert in both modes to prevent duplicates and ensure data persistence
                await DailyHistory.updateOne(
                  { 
                    user: user._id,
                    date: historyDate
                  },
                  {
                    $set: {
                      maintainCalories: maintainCalories,
                      dailyCalories: dailyCalories,
                      createdAt: new Date()
                    }
                  },
                  { upsert: true }
                );

                if (TESTING_MODE) {
                  console.log(`[TESTING] Saved/updated history entry for user ${user.username}: maintain=${maintainCalories}, daily=${dailyCalories}, timestamp=${historyDate.toISOString()}`);
                } else {
                  const historyDateString = dateFormatter.format(historyDate);
                  console.log(`Saved history for user ${user.username}: maintain=${maintainCalories}, daily=${dailyCalories}, date=${historyDateString}`);
                }
              } catch (historyError) {
                console.error(`[ERROR] Failed to save history for user ${user.username}:`, historyError.message);
              }
            } else {
              // Skip saving if there's no data to preserve
              if (TESTING_MODE) {
                console.log(`[TESTING] Skipping history save for user ${user.username} - no calorie data to preserve`);
              }
            }
            
            // Reset dailyCalories
            user.dailyCalories = 0;

            // Reset favoriteFoods quantities
            let updated = false;

            for(let i = 0; i < user.favoriteFoods.length; i++) {
              if(user.favoriteFoods[i].quantity !== 0) {
                user.favoriteFoods[i].quantity = 0;
                updated = true;
              }
            }

            user.updated = new Date();
            await user.save();
            usersReset++;

            if(updated) {
              foodQuantityReset++;
            }

            console.log(`Reset daily data for user ${user.username} (timezone: ${userTimezone})${TESTING_MODE ? ' [TESTING MODE]' : ''}`);
          }
        } catch (tzError) {
          console.error(`[ERROR] Timezone conversion failed for user ${user.username} (${userTimezone}):`, tzError.message);
          continue;
        }
      }

      if(usersReset > 0) {
        console.log(`Daily reset completed. Reset ${usersReset} users' dailyCalories.`);
        console.log(`Reset favoriteFood quantities for ${foodQuantityReset} users.${TESTING_MODE ? ' [TESTING MODE - resets every minute]' : ''}`);
      }

    } catch (error) {
      console.error('Error during daily reset:', error);
    }

  }, {
    scheduled: true
  });
};