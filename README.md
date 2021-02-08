# Frontend / Javascipt - coding challenge.

Welcome to Legal One coding challenge, through this challenge we get to know you better from the coding side of you. let's start.

recommended: a good cup of coffee ☕  and lo-fi coding music 🎵.
___

## The challenge: 
we have a call center which makes tons of calls daily through our call center agents, these calls are dumped in JSON files, we need you to handle these large amount of data, and present them in a nice way for the supervisors. 

the issue with the data is the structure, it is spread across multiple files. we need your mind to solve this issue.


## Tech TODO: 
### 1. The first part:
create a nodeJS app that can serve the data, you can use any nodeJS framework for that. one note here, the data in `json-data` folder should not be changed.


### 2. The second part:
create a Front-end app which uses a frontend js framework for ex: *(Vue, React, etc...)*. the frontend app should have these routes

  - `/` a home page to show an aggregated table for the calls, for ex:

    | Phone number | Number of calls |  Last call details |
    |--------------|-----------------|--------------------|
    | +49151484522 |     3 calls     | Agent name / 11:46 |
    | +49158544147 |     1 call      | Agent name / 14:46 |
    | +49151783331 |     2 calls     | Agent name / 16:46 |

    by clicking on the agent name it would go to the agent log

    by clicking on the **Phone number** it would go to that number log
  - `/agent/${ID}` to show an agent specific calls logs, for ex:

    | Phone number | Call date and time  |     Resolution     |
    |--------------|---------------------|--------------------|
    | +49151484522 | 22/1/2020 14:20:22  |  need reschedule   |
    | +49158544147 | 22/1/2020 16:54:12  |    no response     |
    | +49158544147 | 22/1/2020 17:54:12  |    no response     |


  - `/call/${number}` to show call logs of a specific number  

    |  Agent Name  | Call date and time  |     Resolution     |
    |--------------|---------------------|--------------------|
    |   John Bob   | 22/1/2020 14:20:22  |  need reschedule   |
    |  Chris Toms  | 22/1/2020 17:54:12  |    no response     |
    |   John Bob   | 22/1/2020 17:54:12  |    no response     |


## Important notes: 
* app should run with no errors nor hiccups.
* the data in `json-data` folder should not be changed!.
* representing the data using charts is a plus. 
* unit testing of the code is a plus. 




## Happy coding !