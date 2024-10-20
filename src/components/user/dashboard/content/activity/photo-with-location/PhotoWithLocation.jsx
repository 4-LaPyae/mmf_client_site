import { Button, Col, DatePicker, Form, Input, InputNumber, message, Row, Select, Switch, TimePicker, Typography } from "antd";
import React, { Fragment, useEffect, useState } from 'react';
import * as exifr from 'exifr';
import FileUpload from "../../../../../product-management/category-registration/file-upload";
import { ArrowLeftOutlined } from '@ant-design/icons'; // Import the icon you want to use
import moment from 'moment';
import dayjs from 'dayjs';
import { useGetTypePersonQuery } from "../../../../../../features/feature_apis/typepersonApi";
import { useDebounce } from "use-debounce";
import { use } from "i18next";
import { usePostPcodeMutation } from "../../../../../../features/feature_apis/pcodeUserApi";
import { usePostReportMutation } from "../../../../../../features/feature_apis/reportApi";
import ReportLoading from "../../../../../common/model/ReportLoading";
import { useSelector } from "react-redux";
import "./Style.css";
import SuccessReport from "../../../../../common/model/SuccessReport";
const { TextArea } = Input;

const initialValues = {
    image_file: null,
    shooting_date: "",
    date: "",
    lat: "0",
    lon: "0",
    from_time: "",
    to_time: "",
    postcode_id: "",
    village_pcode: "",
    township: "",
    village_tract: "",
    village: "",
    type_person: "",
    report: ""
}

const type_persons = [
    { key: 1, name: 'Dealer' },
    { key: 2, name: 'Sub-Dealer' },
    { key: 3, name: 'Key Farmer' },
    { key: 4, name: 'Village Leader' },
    { key: 5, name: 'Other' }
]
const ComponentA = ({ setShowComponent }) => {
    const [open,setOpen] = useState(false);
    const [state, setState] = useState(initialValues);
    const [errorStatus, setErrorStatus] = useState('');
    const [msg, setMsg] = useState("");
    const [checkManual, setCheckManual] = useState(false);
    const [searchPcode, setSearchPcode] = useState('');
    const [checkManualSwitch, setCheckManualSwitch] = useState(false);
    const [form] = Form.useForm();

    
    const { user } = useSelector((state) => state.user);

    const [postPCode] = usePostPcodeMutation();
    const [postReport, { isLoading,isSuccess }] = usePostReportMutation();
    const [debouncedValue] = useDebounce(searchPcode, 600);

    const [messageApi, contextHolder] = message.useMessage();


    const searchVillageHandler = (e) => {
        setSearchPcode(e.target.value);
    }
    const handleStateChange = (val) => {
        setState((prev) => ({ ...prev, ...val }));
    };


    useEffect(() => {
        console.log('debouncedValue',debouncedValue);
        if (debouncedValue.trim() !== "") {
            // Call the API when debounced value is available
            postPCode({ postcode: debouncedValue })
                .unwrap()
                .then((result) => {
                    if (result.data) {
                        setCheckManualSwitch(true)
                        setCheckManual(false)
                        handleStateChange({
                            postcode_id: result.data.id
                        });
                        form.setFieldsValue({
                            township: result?.data?.name,
                            village_tract: result?.data?.village_track,
                            village: result?.data?.village
                        })
                    } else {
                        handleStateChange({
                            postcode_id: null
                        });
                        setCheckManualSwitch(false)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [debouncedValue, postPCode]);

    const handleBack = () => {
        setShowComponent(false)
    }


    const handleFileChange = async (info) => {
        //console.log(info);
        if (info.length > 0) {
            handleStateChange({
                image_file: info[0]?.originFileObj
            })
            //setCheckImage(true);
            //const base64Data = await getBase64(file[0].originFileObj);

        } else {
            form.setFieldsValue({
                lat: "0",
                lon: "0",
                shooting_date: "",
                date: "",
                image_file: ""
            })
            handleStateChange({
                lat: "0",
                lon: "0",
                shooting_date: "",
                date: "",
                image_file: null
            })
        }
        const file = info[0]?.originFileObj;
        if (file) {
            try {
                const exifData = await exifr.parse(file);
                if (exifData) {
                    const { latitude, longitude, DateTimeOriginal } = exifData;

                    if (latitude && longitude) {
                        form.setFieldsValue({
                            lat: latitude.toFixed(6),
                            lon: longitude.toFixed(6)
                        })
                        handleStateChange({
                            lat: latitude.toFixed(6),
                            lon: longitude.toFixed(6)
                        })
                    } else {
                        message.warning('No GPS data found in this image.');
                    }

                    if (DateTimeOriginal) {
                        const dateTime = new Date(DateTimeOriginal);
                        const dateString = dateTime.toLocaleDateString() + ' ' + dateTime.toLocaleTimeString();
                        form.setFieldsValue({
                            date: dayjs(dateTime.toLocaleDateString(), 'MM/DD/YYYY'),
                            shooting_date: moment(dateString, 'MM/DD/YYYY h:mm:ss A')
                        })
                        handleStateChange({
                            date: dateTime.toLocaleDateString(),
                            shooting_date: dateString
                        })
                    } else {
                        message.warning('No shooting date and time found in this image.');
                    }
                }
            } catch (error) {
                console.error('Error reading EXIF data:', error);
                message.error('Failed to read EXIF data.');
            }
        }
    }

    const onFinish = async (values) => {
        const formData = new FormData();

        // If postcode_id exists, append it and related fields
        if (state.postcode_id) {
            formData.append('user_id', user.id); // Append file if available
            formData.append('photo', state.image_file); // Append file if available
            formData.append('shooting_date_time', state.shooting_date);
            formData.append('date', state.date == "" ? values.date.format('MM/DD/YYYY') : state.date);
            formData.append('latitude', state.lat);
            formData.append('longitude', state.lon);
            formData.append('from', values.from_time.format('h:mm a'));
            formData.append('to', values.to_time.format('h:mm a'));
            formData.append('postcode_id', state.postcode_id);
            formData.append('typeperson_id', values.type_person);
            formData.append('reporting', values.report);
            formData.append('manual', 0);
        } else {
            // If no postcode_id, append alternate fields
            formData.append('user_id', user.id); // Append file if available
            formData.append('photo', state.image_file); // Append file if available
            formData.append('shooting_date_time', state.shooting_date);
            formData.append('date', values.date);
            formData.append('latitude', state.lat);
            formData.append('longitude', state.lon);
            formData.append('from', values.from_time.format('h:mm a'));
            formData.append('to', values.to_time.format('h:mm a'));
            formData.append('postcode', values.village_pcode);
            formData.append('name', values.township);
            formData.append('village_track', values.village_tract);
            formData.append('village', values.village);
            formData.append('typeperson_id', values.type_person);
            formData.append('reporting', values.report);
            formData.append('manual', 1);
        }
        // console.log(state.date == "" ? values.date.format('MM/DD/YYYY') : state.date);return;
        postReport(formData)
        .unwrap()
        .then(async (result) => {
            if (!result.error) {
                setSearchPcode("");
                form.resetFields();
                setState(initialValues);
                setCheckManual(false);
                setCheckManualSwitch(false)
                setOpen(true);
                //messageApi.success(result.message);
            } else {
                messageApi.error(result.message);
            }
        })
    }
    const onChange = (checked) => {
        if (checkManualSwitch) {
            setCheckManual(false)
        } else {
            setCheckManual(checked)
        }
    };
    console.log(checkManualSwitch)
    return (
        <>
        {contextHolder}
        <div className="form-container" style={{ padding: '20px' }}>
            <Typography.Title
                level={3}
                style={{
                    paddingBottom: 10,
                    margin: 0,
                    textAlign: 'center',
                }}
            >
                Photo With Location
            </Typography.Title>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                autoComplete="off"
            >
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item label="Upload Image" name="image_file">
                            <FileUpload
                                setErrorStatus={setErrorStatus}
                                onFileChange={handleFileChange}
                                buttonText={"click-to-upload"}
                                setMsg={setMsg}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="shooting_date"
                            label="Date and Time of Shooting"
                        >
                            <TimePicker format="MM/DD/YYYY h:mm:ss A" style={{ width: '100%' }} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Latitude"
                            name="lat"
                        >
                            <Input disabled style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="Longitude"
                            name="lon"
                        >
                            <Input disabled style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: 'Please Select Date!',
                        },
                    ]}
                >
                    <DatePicker format="MM/DD/YYYY" style={{ width: '100%' }} />
                    {/* <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} /> */}
                </Form.Item>


                <Row gutter={16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="From"
                            name="from_time"
                            rules={[{ required: true, message: 'This field is required' }]}
                        >
                            <TimePicker
                                format="h:mm a"
                                use12Hours
                                placeholder="Select time"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            label="To"
                            name="to_time"
                            rules={[{ required: true, message: 'This field is required' }]}
                        >
                            <TimePicker
                                format="h:mm a"
                                use12Hours
                                placeholder="Select time"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="Village PCODE"
                    name="village_pcode"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input onChange={searchVillageHandler} placeholder="Enter Village PCode" style={{ width: '100%' }} />
                </Form.Item>

                <Row style={{ paddingBottom: 5 }}>
                    <Col span={24}>
                        <Switch
                            checkedChildren="manual"
                            unCheckedChildren="manual"
                            onChange={onChange}
                            disabled={checkManualSwitch}
                        />
                    </Col>
                </Row>

                <Form.Item
                    label="Township"
                    name="township"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input disabled={!checkManual} placeholder="Enter Township" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Village Tract"
                    name="village_tract"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input disabled={!checkManual} placeholder="Enter Village Tract" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    label="Village"
                    name="village"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Input disabled={!checkManual} placeholder="Enter Village" style={{ width: '100%' }} />
                </Form.Item>
                {/* <Form.Item 
                label="Type Person" 
                name="type_person" 
                rules={[
                    {
                        required: true,
                        message: 'This field is required',
                    },
                ]}
                >
                    <Select
                        defaultValue="jack"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' }
                        ]}
                    />
                </Form.Item> */}
                <Form.Item label="Type Person"
                    name="type_person"
                    rules={[
                        {
                            required: true,
                            message: 'This field is required',
                        },
                    ]}
                >
                    <Select
                        placeholder="Select a Type Person"
                        allowClear
                    >
                        {type_persons.map((item) => (
                            <Select.Option key={item.key} value={item.key}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item 
                label="Reporting" 
                name="report" 
                rules={[
                    {
                        required: true,
                        message: 'This field is required',
                    },
                ]}
                >
                    <TextArea rows={4} placeholder="Reporting*" />
                </Form.Item>

                <Row justify="space-between">
                    <Button
                        onClick={handleBack}
                        icon={<ArrowLeftOutlined />}
                        style={{ marginTop: 20, marginRight: 5 }}
                    >
                        Back
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '150px', marginTop: 20 }}
                        disabled={isLoading}
                    >
                        Entry
                    </Button>
                </Row>
            </Form>
        </div>
        {
            isLoading && <ReportLoading/>
        }
        {
           isSuccess && <SuccessReport open={open} setOpen={setOpen}/>
        }
         
        </>
    )
}
export default ComponentA;

