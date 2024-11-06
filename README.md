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



