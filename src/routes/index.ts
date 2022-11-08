export * from './public-routes';
export * from './private-routes';


export type Route = {
    path: string;
    element: () => JSX.Element;
    id: number;
}