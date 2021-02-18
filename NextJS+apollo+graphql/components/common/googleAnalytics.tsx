import ReactGA from 'react-ga';
import Router from 'next/router';

const { GA_ID } = process.env;
export const initGA = () => {
    if (GA_ID) {
        ReactGA.initialize(GA_ID);
    }
};

export const logPageView = () => {
    //console.log(Router.pathname)
    if (GA_ID) {
        ReactGA.set({ page: Router.pathname });
        ReactGA.pageview(Router.pathname);
    }
};
