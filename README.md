# GetLucky API Documentation

**Live Website Link**: [https://getlucky-f839f.web.app/](https://getlucky-f839f.web.app/)

Tech Stack: React.js, Tailwindcss, Express.js, Node.js, MongoDB, mongoose, Firebase

## API Routes

| Route                | Description                   | HTTP Method | Parameters                  | Protected |
|----------------------|-------------------------------|-------------|-----------------------------|-----------|
| /api/user            | Add new user                  | POST        | uid, email, name, state     | No        |
| /api/user            | Give admin access to user     | PUT         |                             | Yes       |
| /api/state           | Add new state                 | POST        | name, distributionLimit     | Yes       |
| /api/state           | Get all state list            | GET         |                             | No        |
| /api/gift            | Add new gift item             | POST        | type, quantity              | Yes       |
| /api/gift            | Get all available gift items  | GET         |                             | Yes       |
| /api/gift            | Increase gift quantities      | PUT         | [{type, quantity}]          | Yes       |
| /api/giftTracking    | Distribute gift to user       | POST        |                             | Yes       |
| /api/giftTracking    | Get all gifts received by user| GET         |                             | Yes       |
| /api/giftTracking/all| Get all gifts that have been distributed | GET |         | Yes       |

## Distribution Logic

1. Get all available gift items.
2. Generate a random number between 0 and the number of gift items - 1 (to select a gift to distribute from the gifts array).
3. Check if the selected gift can be distributed:
   - **If not**:
     - Inform the user to try again later.
   - **Else**:
     - Distribute the gift to the user.
     - Update the Gifts Tracking Collection and Gifts table (reduce available gifts).
     - Return the newly created document to the user.
