import { ComponentType,useState} from "react";
import { ReactElement } from "../../lib/types";
import { Form, Typography, message,Breadcrumb } from "antd";
import { useNavigate } from "react-router-dom";
const {Title} = Typography;

interface FormProps {
    title:string;
    successMessage?:string;
    items:any
}
const withForm = <T extends FormProps>(
    WrappedComponent:ComponentType<T>,
    submitFn:Function
) => {
    const withForm = (props:T) => {
        const {title,items,...rest} = props as T;
        const [form] = Form.useForm();
        const [loading,setLoading] = useState<boolean>(false);
        const [messageApi,contextHolder] = message.useMessage();
        const navigate = useNavigate();
        
        const onReset = () => {
            form.resetFields();
        };
        const onFinish = (values:any) => {
            setLoading(true);
            alert(JSON.stringify(values,null,2))
            messageApi.open({
                type:'loading',
                content:'Submitting...',
                duration:2
            }).then(() => {
                const handleSubmit = async () => {
                    try {
                        const res = await submitFn(values);
                        message.success(props.successMessage || 'Submitted successfully',2,()=> {
                                setLoading(false);
                                navigate('/genres');
                        })
                    }catch(err) {
                        message.error('Something went wrong!!!',2);
                        setLoading(false);
                    }
                };
                handleSubmit();
            })
        }

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
        )
    }
    return withForm;
};

export default withForm;

