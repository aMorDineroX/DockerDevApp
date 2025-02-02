import { Router } from '@angular/router';

// external-modules.js

export function handleRouteError(router: Router) {
    router.events.subscribe(event => {
        if (event instanceof Error) {
            console.error('Navigation error:', event);
            // Redirect to error page or handle the error as needed
            router.navigate(['/error']);
        }
    });
}

export const externalModules = {
    router: {
        configure: (router) => {
            handleRouteError(router);
        }
    }
};

export default externalModules;