Live website Link: https://getlucky-f839f.web.app/

Api Routes:


| Route | Description | HTTP Method | Parameters | Protected |
|---|---|---|---|---|
| /api/user | Add new user | POST | uid, email, name , state | No |
| /api/user | Give admin access to user | PUT | |Yes|
| /api/state | Add new state | POST | name, distributionLimit |Yes |
| /api/state | Get all state list | GET | |No |
| /api/gift | Add new gift item | POST |type,quantity |Yes|
| /api/gift |Get all available gift items | GET | |Yes|
| /api/gift | Increase gift quantities | PUT | [{type,quantity}]|Yes|
| /api/giftTracking | Distribute gift to user | POST | |Yes|
| /api/giftTracking | Get all gifts received by user | GET | |Yes|
| /api/giftTracking/all | Get all gift that has been distributed | GET | |Yes|

Distribution Logic: 
  * Get All available Gift items
  * Get a random number between 0 to Number of gift items-1, (to distribute gift at that index on Gifts Array)
  * Check if that gift can be distributed or not
    *If not ask user to try again later
    *Else give the gift to the user, update Gifts Tracking Collection, and Gifts table( reduce available gifts) and return the newly created document to the user
