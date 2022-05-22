# VolunCheers BE

# Description

VolunCheers is an easy-to-use system that engages, tracks, and manages volunteers in service to their communities. User easily post and apply for a job or leave a question about what they want to know more about that job. They can see a list of jobs that they have posted attached with the job’s candidate list. User can update their profile and manage their application.

## User flow (UF)

1. User can create account with email and password and name
2. User can login with email and password
3. User can login with accessToken
4. User can get single user profile by id (login required)
5. Owner can update own account profile include password(except: email)
6. Owner can deactivate own account
7. . User can get the number of users who have registed.

## Job Flow (JF)6

1. User can create a job
2. Author can edit job
3. Author can deactivate job
4. user can get a single job by id job
5. User can see a list of all jobs (pagination,sort,search)
   - user can sort by acs/decs date
   - user can search by name", "type", "category", "location", "status"
6. Author can get all own job (pagination,sort,search)
   - user can sort by "acs"/"decs" date
   - user can search by name", "type", "category", "location", "status"

---

## comment flow (CF):

1. User can create a comment to job post
2. Author of Comment can eidt comment
3. Author of Comment can delete that comment
4. Employer can reply comment
5. User can see comment list by jobid (not login required),pagination
   - search by reply === "missing" : haven't reply yet

---

## Application flow (AF)

1. user can apply job
2. user can cancel job
3. author can respond request
4. author can get list application By JobId +search by status
5. user can get own application List +search by status
6. user can get application by jobId
7. user can get all application + filter by month + status

# Link to demo

https://voluncheer.herokuapp.com/

# Link to API

https://voluncheer-api.herokuapp.com/

# mock demo account sign-in info.

ID: my.le@gmail.com
password: 12345a
