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
        <div className={'L-row'}>
          <p className={'L-p'}>
            {staff.user.name} {staff.role}
          </p>
          <button className={'L-delete-btn'} onClick={() => handleDelete(staff.id, staffList)}>
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
    <div className={'L-container'}>
      <div className={'L-description'}>
        <h3 className={'L-description-title'}>{party_id.split('-')[0]}에 등록된 운영진 목록입니다.</h3>
      </div>
      {renderStaff(staffList)}
      <button className={'L-button'} onClick={() => window.location.replace('/staff/create/' + party_id)}>
        운영진 등록하기
      </button>
      <button
        className={'L-button'}
        onClick={() => {
          /*여기 양식 좀 리다이렉트 좀 채워줘*/
        }}
      >
        채점 양식 확인 완료
      </button>
    </div>
  );
}

export default ReadStaff;
