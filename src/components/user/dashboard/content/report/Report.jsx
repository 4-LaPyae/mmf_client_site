import { Space, Typography, DatePicker, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';
import "./Style.css";
import { useEffect, useState } from "react";
import { usePostReportListMutation } from "../../../../../features/feature_apis/reportApi";
import { useSelector } from "react-redux";
import ReportList from "./List/ReportList";
import ReportModel from "./List/RepotModel";
const Report = () => {
    const [fromDate,setFromDate] = useState(dayjs().subtract(7, 'days'));
    const [toDate,setToDate] = useState(dayjs());
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data,setData] = useState([]);
    const [openModel,setOpenModel] = useState(false);
    const [reportData,setReprtData] = useState({});
    const { user } = useSelector((state) => state.user);

    const [postReportList,{ isLoading,isSuccess }] = usePostReportListMutation();
    const onChangeFromDate = (date, dateString) => {
        if (date && date.isValid()) {
            setFromDate(date);
        }
    };
    const onChangeToDate = (date, dateString) => {
        if (date && date.isValid()) {
            setToDate(date);
        }
    };
    const searchHandler = async() => {
        const values = {
            user_id: user?.id,
            from: fromDate,
            to: toDate,
        };

        try {
            const result = await postReportList({ data: values, page, limit: rowsPerPage }).unwrap();
            if (!result.error) {
                setData(result);
            }
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    }
    useEffect(() => {
        searchHandler();
    },[page]);
    return (
        <>
            <div className="report-form-container">
                <Typography.Title
                    level={3}
                    style={{
                        paddingBottom: 20,
                        margin: 0,
                        textAlign: 'center',
                    }}
                >
                    Report
                </Typography.Title>

                <Space style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label>From *</label>
                        <DatePicker
                         value={fromDate}
                         onChange={onChangeFromDate}
                         format="YYYY-MM-DD"
                         />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <label>To *</label>
                        <DatePicker
                         defaultValue={toDate}
                         onChange={onChangeToDate}
                         format="YYYY-MM-DD"
                         />
                    </div>
                </Space>
                <Space style={{display:'flex',justifyContent:'center',padding:10}}>
                <Button type="primary" icon={<SearchOutlined />} onClick={searchHandler}>
                        Search
                    </Button>
                </Space>

                <ReportList 
                data={data}
                isLoading={isLoading}
                setPage={setPage}
                setOpenModel={setOpenModel}
                setReprtData={setReprtData}
                />

                <ReportModel openModel={openModel} setOpenModel={setOpenModel} reportData={reportData}/>

            </div>
        </>
    )
}
export default Report;



