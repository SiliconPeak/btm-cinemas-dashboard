import { 
    Breadcrumb,
    Form,
    Typography,
    Col,
    Row,
    Input,
    Select,
    Button,
    message
} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { movieRoleServices } from "../../services/movie-role.services";
const {Title} = Typography;
const {Option} = Select;
const MovieRoleEditForm =() => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    let {id:moveRoleId} = useParams();
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }
    useEffect(() => {
        const getMovieRole = async () => {
            try {
                const res = await movieRoleServices.getMovieRoleById(moveRoleId);
                if(res.status === 200) {
                    form.setFieldsValue({
                        title:res.data.title,
                        status:res.data.status
                    })
                } else {
                    throw 'Genre not found!!'
                }
            } catch(err) {
                alert(err);
            }
        };
        getMovieRole();
    },[])

    const onFinish = (values:any) => {
         if(values) {
            messageApi.open({
                type:'loading',
                duration:2.5,
                content:'Updating....'
            }).then(() => {
                const editMovieRole = async () => {
                    try {
                        const res = await movieRoleServices.editMovieRole(moveRoleId,values);
                        if(res && res.status === 200) {
                            message.success('Movie role updated successfully!',1,() => {
                                navigate('/movie-roles');
                            })
                        } else {
                            throw 'Movie role not updated';
                        }
                    } catch(err) {
                        message.error("Movie role not updated",2);
                    }
                };
                editMovieRole();
            })
         }
    }
    return (
        <div className="page__form--container">
            <div className="page__form--header">
                <Breadcrumb 
                separator=">"
                items={[
                    {
                        title:<Link to="/movie-roles">Movie Role</Link>
                    },
                    {
                        title:'Edit'
                    }
                ]}
                />
            </div>
            <div className="page__form--body">
                {contextHolder}
                <div className="page_form-heading">
                    <Title level={4}>Update Movie Role</Title>
                </div>
                <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                >
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Title"
                                name="title"
                                rules={[{required:true,message:"Please enter title."}]}
                            >
                                <Input size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                            label="status"
                            name="status"
                            rules={[{required:true,message:"Status is required!!"}]}
                            >
                                <Select placeholder="Choose status"  size="small">
                                    <Option value="active">Active</Option>
                                    <Option value="inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Col> 
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} style={{textAlign:"right"}}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{marginRight:"10px"}}
                                loading={loading}
                            >
                                {loading ? 'Editting' : 'Edit'}
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default MovieRoleEditForm;