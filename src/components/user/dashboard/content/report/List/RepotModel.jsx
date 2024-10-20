import {Typography ,Modal, Image } from "antd";
import dayjs from 'dayjs';
const ReportModel = ({openModel,setOpenModel,reportData})=>{
    const handleModalClose = () => {
        setOpenModel(false)
    };
    return(
        <Modal
        title="Report Details"
        open={openModel}
        onCancel={handleModalClose}
        footer={null}
        width={800} // Set modal width if needed
    >
                <Typography.Title level={4}>{reportData?.reporting}</Typography.Title>
                <Typography.Paragraph>
                    <strong>Reported by:</strong> {reportData?.user}
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <strong>Shooting Date/Time:</strong> {reportData?.shooting_date_time}
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <strong>From:</strong> {reportData?.from} <br />
                    <strong>To:</strong> {reportData?.to}
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <strong>Postcode:</strong> {reportData?.postcode} <br />
                    <strong>Type of Person:</strong> {reportData?.typeperson}
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <strong>Location:</strong> {reportData?.latitude}, {reportData?.longitude}
                </Typography.Paragraph>
                <Typography.Paragraph>
                    <strong>Created At:</strong> {dayjs(reportData?.created_at).format('YYYY-MM-DD HH:mm:ss')}
                </Typography.Paragraph>
                <Image 
                    width={200} 
                    src={reportData?.photo} 
                    alt="Report Image"
                    fallback={'/src/assets/images/no-photo/nophoto.jpg'}
                />
    </Modal>
    )
}

export default ReportModel;