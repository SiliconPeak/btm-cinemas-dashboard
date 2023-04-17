import { 
    Form, 
    Input,
    Button,
    Row,
    Col,
    Select,
    DatePicker} from "antd";
import { PersonCreateType, ReactElement } from "../../lib/types";
import { personServices } from "../../services/person.services";
import withForm from "../HOC/withForm";
const {Option} = Select;



const PersonForm = (props:any):ReactElement => {
    return (
        <Form
            form={props.form}
            name="control-hooks"
            onFinish={props.onFinish}
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
                    <Col className="gutter-row" span={8}>
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
                    </Col>

                </Row>
                <Row gutter={[25,8]}>
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
                </Row>
                <Row gutter={[25,8]}>
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
                            loading={props.loading}
                        >
                            {props.loading ? 'Submitting' : 'Submit'}
                        </Button>
                        <Button htmlType="button" onClick={props.onReset}>
                            Reset
                        </Button>
                    </Col>
                </Row>
            </Form>
    );
};

export default withForm(PersonForm,personServices.createPerson);