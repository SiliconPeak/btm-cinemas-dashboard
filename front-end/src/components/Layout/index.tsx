import { createElement,useState } from "react";
import { Outlet,useNavigate,Link} from "react-router-dom";
import type { FC, ReactElement } from "../../lib/types";
import { NavigateFunction } from "../../lib/types";
import {Avatar, Layout as AntLayout,Menu,Popover,Button} from "antd";
import {
    KeyOutlined, 
    LoginOutlined, 
    MenuFoldOutlined, 
    MenuUnfoldOutlined,
    ExpandAltOutlined, 
    UserOutlined, 
    VideoCameraOutlined,
    BorderlessTableOutlined
} from "@ant-design/icons";
import authService from "../../services/auth.services";
const {Header,Sider,Content} = AntLayout;
const content:ReactElement = (
        <ul style={{listStyle:"none",padding:0}}>
           <li className="user__actions--list"><Link to="/change-password"><KeyOutlined/> &nbsp;Change Password</Link></li>
           <li className="user__actions--list"><Button style={{padding:0}} type="link" onClick={() => {
               authService.logout();
               window.location.href = "/";
             }}><LoginOutlined/> &nbsp;Sign Out</Button></li>
        </ul>
);
const Layout:FC = ():ReactElement => {
    const [collapsed,setCollapsed] = useState<boolean>(false);
    const navigate:NavigateFunction = useNavigate();
    return (
        <AntLayout style={{
            height:"100vh"
        }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{
                background:"#fff"
            }} >
                <div className="logo">
                    <img src="/logo.png"/>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['/']}
                    onClick={({key}) => {
                       navigate(key);
                    }}
                    items={[
                        {
                            key:'/',
                            icon:<UserOutlined/>,
                            label:'User Settings',
                        },
                        {
                            key:'/movies',
                            icon:<VideoCameraOutlined/>,
                            label:'Movies'
                        },
                        {
                            key:'/genres',
                            icon:<ExpandAltOutlined />,
                            label:'Genres'
                        },
                        {
                            key:'/movie-roles',
                            icon:<BorderlessTableOutlined/>,
                            label:'Movie Roles'
                        }
                    ]}
                />
            </Sider>
            <AntLayout >
                <Header
                 style={{
                    padding:".3rem",
                    background:"#fff",
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"

                 }}
                >
                    {
                       createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className:'trigger',
                        onClick: () => setCollapsed(!collapsed)
                       })
                    }
                    <div style={{paddingRight:"15px"}}>
                        <Popover placement="bottomRight" content={content} trigger="click">
                            <Avatar size={35}>Admin</Avatar>
                        </Popover>
                    </div>
                </Header>
                <Content
                    style={{
                        margin:'24px 16px',
                        padding:24,
                        minHeight:280,
                        background:"#fff"
                    }}
                >
                    <Outlet/>
                </Content>
            </AntLayout>
        </AntLayout>
    );
};
export default Layout;



