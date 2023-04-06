import { Breadcrumb, Form, Input,Button,Row,Col,Typography,message} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GenreCreateType, ReactElement } from "../../lib/types";
import {useNavigate} from "react-router-dom";
import { genreServices } from "../../services/genre.services";
const {Title} = Typography;

const GenreForm = ():ReactElement=> {
    const [form] = Form.useForm();
    const [messageApi,contextHolder] = message.useMessage();
    const [loading,setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }
    const onFinish = (values:GenreCreateType) => {
        setLoading(true);
        messageApi.open({
            type:'loading',
            content:'Submitting..',
            duration:2
        }).then(() => {
            if(values) {
                const addGenre = async () => {
                    try {
                        const res = await genreServices.createGenre(values);
                        console.log(res);
                        message.success('Genre added successfully',2,()=> {
                            setLoading(false);
                            navigate('/genres');
                        })
                    } catch(err) {
                        message.error('Something went wrong!!!',2)
                    }
                  
                };
                addGenre();
            }
        })
       
        
    }
  return (
    <div className="page__form--container ">
            <div className="page__form--header">
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title:<Link to="/genres">Genre</Link>
                    },
                    {
                        title:"Create"
                    }
                ]}
             />
            </div>
            <div className="page__form--body">
                {contextHolder}
                <div className="page_form-heading">
                    <Title level={4}> Create Genre</Title>
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
                                rules={[{required:true,message:"Please enter name."}]}
                            >
                                <Input size="small"/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{required:true,message:"Please enter name."}]}
                            >
                                <Input  size="small"/>
                            </Form.Item>
                        </Col>
                        <Col span={8} style={{textAlign:"right"}}>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                style={{marginRight:"10px"}}
                                loading={loading}
                            >
                                {loading ? 'Submitting' : 'Submit'}
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

export default GenreForm;