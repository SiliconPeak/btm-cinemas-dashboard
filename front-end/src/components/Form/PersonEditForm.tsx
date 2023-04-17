import { ReactElement } from "../../lib/types";
import { 
    Breadcrumb,
    Form,
    Typography,
    Col,
    Row,
    Input,
    Select,
    Button,
    message,
    DatePicker
} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { personServices } from "../../services/person.services";
const {Title} = Typography;
const {Option} = Select;

const PersonEditForm = ():ReactElement => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    let {id:PersonId} = useParams();
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }
    useEffect(() => {
        const getPerson = async () => {
            try {
                const res = await personServices.getPersonById(PersonId);
                if(res.status === 200) {
                    form.setFieldsValue({
                        name:res.data.name,
                        status:res.data.status,
                        gender:res.data.gender,
                        email:res.data.email,
                        contact:res.data.contact,
                        birthPlace:res.data.birthPlace,
                        biography:res.data.biography,
                        roleId:res.data.roleId,
                        departmentId:res.data.departmentId
                    })
                } else {
                    throw 'Genre not found!!'
                }
            } catch(err) {
                alert(err);
            }
        };
        getPerson();
    },[])

    const onFinish = (values:any) => {
         if(values) {
            messageApi.open({
                type:'loading',
                duration:2.5,
                content:'Updating....'
            }).then(() => {
                const editPerson = async () => {
                    try {
                        const res = await personServices.editPerson(PersonId,values);
                        if(res && res.status === 200) {
                            message.success('Person updated successfully!',1,() => {
                                navigate('/person');
                            })
                        } else {
                            throw 'Person not updated';
                        }
                    } catch(err) {
                        message.error("Person not updated",2);
                    }
                };
                editPerson();
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
                        title:<Link to="/person">Person</Link>
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
                    <Title level={4}>Update Person</Title>
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
                                label="Gender"
                                name="gender"
                                rules={[{required:true,message:"Please choose gender"}]}
                            >
                                <Select placeholder="Choose gender"  size="small">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{required:true,message:"Please enter email."}]}
                            >
                                <Input type="email" size="small"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Contact"
                                name="contact"
                                rules={[{required:true,message:"Please enter contact."}]}
                            >
                                <Input type="number" size="small"/>
                            </Form.Item>
                        </Col>
                        {/* <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Birth Date"
                                name="birthday"
                                rules={[{required:true,message:"Please select birth date."}]}
                            >
                                <DatePicker/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Death Date"
                                name="deathday"
                            >
                                <DatePicker/>
                            </Form.Item>
                        </Col> */}
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Birth place"
                                name="birthPlace"
                                rules={[{required:true,message:"Please enter birth place."}]}
                            >
                                <Input size="small"/>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="biography"
                                name="biography"
                                rules={[{required:true,message:"Please enter biography."}]}
                            >
                                <Input.TextArea  size="small"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Status"
                                name="status"
                                rules={[{required:true,message:"Please enter status."}]}
                            >
                                <Select placeholder="Choose status"  size="small">
                                    <Option value="active">Active</Option>
                                    <Option value="inactive">Inactive</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Role"
                                name="roleId"
                                rules={[{required:true,message:"Please select role."}]}
                            >
                                <Select placeholder="Choose role"  size="small">
                                    <Option value="1">Actor</Option>
                                    <Option value="2">Pilot</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Department"
                                name="departmentId"
                                rules={[{required:true,message:"Please select department."}]}
                            >
                                <Select placeholder="Choose department"  size="small">
                                    <Option value="2">Production</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={24} style={{textAlign:"right"}}>
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

export default PersonEditForm;
