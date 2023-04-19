import React from "react";
import { 
    Form, 
    Input,
    Button,
    Row,
    Col,
    Select,
    DatePicker,
    Checkbox
} from "antd";
import { ReactElement } from "../../lib/types";
import { movieServices } from "../../services/movie.services";
import withForm from "../HOC/withForm";
const {Option} = Select;

const MovieForm = (props:any):ReactElement => {
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
                            label="Original Name"
                            name="original_name"
                            rules={[{required:true,message:"Please enter original name."}]}
                        >
                            <Input size="small"/>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Language"
                            name="language"
                            rules={[{required:true,message:"Please enter email."}]}
                        >
                            <Input  size="small"/>
                        </Form.Item>
                    </Col>
                   
                </Row>
                <Row gutter={[25,8]}>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Duration"
                            name="duration"
                            rules={[{required:true,message:"Please enter duration."}]}
                        >
                            <Input size="small"/>
                        </Form.Item>
                    </Col>
                    {/* <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Release Date"
                            name="releaseDate"
                            rules={[{required:true,message:"Please select release date."}]}
                        >
                             <DatePicker/>
                        </Form.Item>
                    </Col> */}
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Overview"
                            name="overview"
                            rules={[{required:true,message:"Please enter duration."}]}
                        >
                            <Input.TextArea size="small"/>
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={[25,8]}>
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            name="adults"
                            valuePropName="checked"
                        >
                           <Checkbox>Is Adult</Checkbox>
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
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Poster Url"
                            name="posterUrl"
                            rules={[{required:true,message:"Please enter duration."}]}
                        >
                            <Input size="small"/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[25,8]}>
                        <Col className="gutter-row" span={8}>
                            <Form.Item
                                label="Genre"
                                name="generId"
                                rules={[{required:true,message:"Please enter status."}]}
                            >
                                <Select placeholder="Choose status"  size="small">
                                    <Option value="1">Comedy</Option>
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

export default withForm(MovieForm,movieServices.createMovie);