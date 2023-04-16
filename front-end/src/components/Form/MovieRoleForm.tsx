import { Form, Input,Button,Row,Col} from "antd";
import { ReactElement } from "../../lib/types";
import {movieRoleServices} from "../../services/movie-role.services";
import withForm from "../HOC/withForm";
const MovieRoleForm = (props:any):ReactElement => {
    return (
       <Form
          form={props.form}
          onFinish={props.onFinish}
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
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{required:true,message:"Please enter status."}]}
                        >
                            <Input  size="small"/>
                        </Form.Item>
                    </Col>
                    <Col span={8} style={{textAlign:"right"}}>
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

export default withForm(MovieRoleForm,movieRoleServices.createMovieRole);