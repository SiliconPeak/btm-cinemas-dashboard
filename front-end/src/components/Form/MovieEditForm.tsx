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
    DatePicker,
    Checkbox
} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { movieServices } from "../../services/movie.services";
const {Title} = Typography;
const {Option} = Select;

const MovieEditForm = ():ReactElement => {
    const [form] = Form.useForm();
    const [loading,setLoading] = useState<boolean>(false);
    const [messageApi,contextHolder] = message.useMessage();
    let {id:MovieId} = useParams();
    const navigate = useNavigate();
    const onReset = () => {
        form.resetFields();
    }
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await movieServices.getMovieById(MovieId);
                if(res.status === 200) {
                    form.setFieldsValue({
                        name:res.data.name,
                        original_name:res.data.original_name,
                        language:res.data.language,
                        duration:res.data.duration,
                        overview:res.data.overview,
                        adults:res.data.adults,
                        status:res.data.status,
                        posterUrl:res.data.posterUrl,
                        generId:res.data.generId
                    })
                } else {
                    throw 'Movie not found!!'
                }
            } catch(err) {
                alert(err);
            }
        };
        getMovie();
    },[])

    const onFinish = (values:any) => {
         if(values) {
            messageApi.open({
                type:'loading',
                duration:2.5,
                content:'Updating....'
            }).then(() => {
                const editMovie = async () => {
                    try {
                        const res = await movieServices.editMovie(MovieId,values);
                        if(res && res.status === 200) {
                            message.success('Movie updated successfully!',1,() => {
                                navigate('/movies');
                            })
                        } else {
                            throw 'Movie not updated';
                        }
                    } catch(err) {
                        message.error("Movie not updated",2);
                    }
                };
                editMovie();
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
                        title:<Link to="/movies">Movie</Link>
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
                    <Title level={4}>Update Movie</Title>
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
                            rules={[{required:true,message:"Please enter language."}]}
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
                    <Col className="gutter-row" span={8}>
                        <Form.Item
                            label="Overview"
                            name="overview"
                            rules={[{required:true,message:"Please enter overview."}]}
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
                            rules={[{required:true,message:"Please enter poster url."}]}
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
                                rules={[{required:true,message:"Please enter genreId."}]}
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

export default MovieEditForm;
