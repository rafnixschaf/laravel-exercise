# wlan checker

What began as a simple exercise is now my go-to place to get hands-on with
Laravel. I’ll keep shipping small improvements while I learn and iterate.


## Initialize the project
`npm install`  
`docker-compose up`

The next commands will be called from the docker machine, so we first need the hash from the sail docker machine

`docker ps`  
`docker exec -it <container_id> bash`  
`php artisan migrate:install`  
`php artisan migrate:fresh`  
`php artisan db:seed`  

## Start the application

`docker-compose up` - start backend, db  
`npm run dev` - start frontend  
`npm run storybook` - start storybook  

### Test User

Since the registration does not work, a test user is created with `db:seed` with the following credentials  
`test@example.com` and `TestPassword123`

### Report Mail
Update the receiver to get the report mail  
`.env - REPORT_MAIL_RECEIVER=`


### TODO
- add tests
- move global message handling to external store (like redux)
- add registration
- i18n
- rename route/pages
- add softdelete
- resend a report
- change relationship between reports and locations especially when we delete a location

### Working Notes & Open Questions

**Type-safe reducer factory in TypeScript.**  
Goal: when `action.type` selects a handler, the handler should receive a *narrowed* 
`action` so that payload shapes are accurate per action — without falling back to `any`.  
Status: indexing a handler map by a union key makes TypeScript lose the correlation between 
`type` and the payload shape.   

```typescript
function createGlobalReducer<Context, Action extends IGlobalAction>(
    handlers: IGlobalHandlerMap<Context, Action>
): IGlobalReducer<Context, Action> {
    return (state: Context, action: Action) => {
        const fn = (handlers as any)[action.type] as
            | ((s: Context, a: Action) => Context)
            | undefined;
        return fn ? fn(state, action) : state;
    };
}
```
