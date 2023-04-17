import { ComponentType,useState} from "react";
import { HOCFormProps } from "../../lib/types";
import { Form, Typography, message,Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
const {Title} = Typography;

//HOC TO IMPLEMENT THE REDUNDANT LOGIC TO ALMOST ALL FORMS IN MOVIE DASHBOARD
const withForm = <T extends HOCFormProps>(
    WrappedComponent:ComponentType<T>,
    submitFn:Function
) => {
    const withForm = (props:T) => {
        const {title,items,navigateAfterSubmission,...rest} = props as T;
        const [form] = Form.useForm();
        const [loading,setLoading] = useState<boolean>(false);
        const [messageApi,contextHolder] = message.useMessage();
        const navigate = useNavigate();
        
        const onReset = () => {
            form.resetFields();
        };
        const onFinish = (values:any) => {
            setLoading(true);
            // alert(JSON.stringify(values,null,2));
            // return;
            messageApi.open({
                type:'loading',
                content:'Submitting...',
                duration:2
            }).then(() => {
                const handleSubmit = async () => {
                    try {
                        const res = await submitFn(values);
                        if(!res) {
                            throw 'Error';
                        }
                        message.success(props.successMessage || 'Submitted successfully',2,()=> {
                                setLoading(false);
                                navigate(navigateAfterSubmission);
                        })
                    }catch(err) {
                        message.error(props.errorMessage || 'Something went wrong!!!',2);
                        setLoading(false);
                    }
                };
                handleSubmit();
            })
        };

        return (
                <div className="page__form--container ">
                    {contextHolder}
                    <div className="page__form--header">
                    <Breadcrumb
                        separator=">"
                        items={items}
                    />
                    </div>
                    <div className="page__form--body">
                        <div className="page_form-heading">
                            <Title level={4}>{title}</Title>
                        </div> 
                        <WrappedComponent
                            {...props}
                            form={form}
                            loading={loading}
                            contextHolder={contextHolder}
                            onReset={onReset}
                            onFinish={onFinish}
                        />
                    </div>
            </div>
        );
    };
    return withForm;
};

export default withForm;

