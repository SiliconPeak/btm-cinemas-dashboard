import { ComponentType } from "react";
import {Link} from "react-router-dom";
import { Typography,Button} from "antd";
import { ReactElement } from "../../lib/types";
interface PageListLayoutProps {
    title:string,
    icon?:ReactElement,
    iconText:string,
    iconUrl:string
}
const {Title} = Typography;

const withPageListLayout = <T extends PageListLayoutProps>(
    WrappedComponent:ComponentType<T>
) => {
   const withPageListLayout = (props:T) => {
        const {title,icon,iconText,iconUrl,...rest} = props as PageListLayoutProps;
        return (
            <div className="page__list">
                <div className="page__list--header">
                    <Title level={4}>{title}</Title>
                    <Button type="primary" icon={icon}>
                        <Link to={iconUrl}>{iconText}</Link>
                    </Button>
                </div>
                <WrappedComponent {...props}/>
            </div>
        );
   };

   return withPageListLayout;
}

export default withPageListLayout;