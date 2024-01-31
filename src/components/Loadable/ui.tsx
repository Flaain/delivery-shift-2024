import React from "react";
import { JSX } from "react/jsx-runtime";

const Loadable = <T,>(Component: React.FunctionComponent<T>, fallback?: JSX.Element) => (props: JSX.IntrinsicAttributes & T) => (
    <React.Suspense fallback={fallback}>
        <Component {...props} />
    </React.Suspense>
)

export default Loadable;