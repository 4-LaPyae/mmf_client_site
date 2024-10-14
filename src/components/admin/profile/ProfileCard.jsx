import { Card } from "antd";

const { Meta } = Card;

const ProfileCard = ({user}) => {
    return (
        <Card
        // hoverable
        style={{ 
           // boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" 
           textAlign:"center"
        }}
        cover={<img alt="example" src={user?.photo} />}
      >
        <Meta title={`${user.name}`}  description={`${user.email}`} />
      </Card>
    )
}

export default ProfileCard;