# Background

# Tech stack

# Live demo
Currently works locally, through local mongodb database, as well as when trying the herkou link using postman : https://fp-weeklyplanner.herokuapp.com
However, using this heroku link in fetch on frontend (deployed on Netlify) - the app doesn't work as expected anymore. No error messages in network either when debugging, and at this point I have no longer an idea of what it could be. 

Since it works flawlessly in Postman (the heroku link) and locally using local mongodb storage, my hypothesis is that it's probably something to do with CORS again - although I can't figure out what, since there are no error messages for this. 

I have also looked at the useEffect hooks in frontend, and tried removing the automatic deletion of old tasks, however no effects.
Moreover, since the frontend works both locally, as well as when deployed in Netlify but fetching from localhost instead of the heroku link, it works as expected, leading me to the conclusion that it can't possibly be the code logic?

Thus, I highly suspect something with the CORS thing again, but have had no luck in finding solutions.

Therefore, try this app through using your local mongoDb database, through the Netlify link: 
https://weekly-planner-pwa.netlify.app/






