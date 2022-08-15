import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import instance from '../../utils/axiosConfig';

function ReadStaff() {
  const [staffList, setStaffList] = useState([]);

  const { party_id } = useParams();

  const handleDelete = async (staff_id, staffList) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const res = await instance.delete(`/staff/${staff_id}`);
      setStaffList(staffList.filter((staff) => staff.id !== staff_id));
      alert(`운영진이 삭제됐습니다.`);
    } else {
      alert('취소됐습니다.');
    }
  };

  const fetchStaff = async () => {
    const res = await instance.get(`/staff/${party_id}`);

    setStaffList(res.data);
  };

  const renderStaff = (staffList) => {
    return staffList.map((staff) => {
      return [
        <div>
          <p>
            {staff.user.name} {staff.role}
          </p>
          <button onClick={() => handleDelete(staff.id, staffList)}>
            삭제
          </button>
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
