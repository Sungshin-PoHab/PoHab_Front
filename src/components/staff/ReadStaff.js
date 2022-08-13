import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';

function ReadStaff() {
  const [staffList, setStaffList] = useState([]);

  const { party_id } = useParams();

  const fetchStaff = async () => {
    const res = await instance.get(`/staff/${party_id}`);

    setStaffList(res.data);
  };

  const renderStaff = (staffList) => {
    return staffList.map((staff) => {
      return [
        <div>
          <p>
            {' '}
            {staff.user.name} {staff.role}
          </p>
          <button>삭제</button>
        </div>,
      ];
    });
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div>
      <h3>{party_id}에 등록된 운영진 목록입니다.</h3>
      {renderStaff(staffList)}
    </div>
  );
}

export default ReadStaff;
