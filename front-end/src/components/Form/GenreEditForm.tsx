import { ReactElement,FC } from "../../lib/types";
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
import { genreServices } from "../../services/genre.services";
const {Title} = Typography;
const {Option} = Select;
const GenreEditForm =() => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    let {id:genreId} = useParams();
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }
    useEffect(() => {
        const getGenre = async () => {
            try {
                const res = await genreServices.getGenreById(genreId);
                if(res.status === 200) {
                    form.setFieldsValue({
                        name:res.data.name,
                        status:res.data.status
                    })
                } else {
                    throw 'Genre not found!!'
                }
            } catch(err) {
                alert(err);
            }
        };
        getGenre();
    },[])

    const onFinish = (values:any) => {
         if(values) {
            messageApi.open({
                type:'loading',
                duration:2.5,
                content:'Updating....'
            }).then(() => {
                const editUser = async () => {
                    try {
                        const res = await genreServices.editGenre(genreId,values);
                        if(res && res.status === 200) {
                            message.success('Genre updated successfully!',1,() => {
                                navigate('/genres');
                            })
                        } else {
                            throw 'Genre not updated';
                        }
                    } catch(err) {
                        message.error("Genre not updated",2);
                    }
                };
                editUser();
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
                        title:<Link to="/">Genre</Link>
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
                    <Title level={4}>Update Genre</Title>
                </div>
                <Form
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                >
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{required:true,message:"Please enter full name."}]}
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

export default GenreEditForm;