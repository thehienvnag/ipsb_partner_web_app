import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { debounce } from "App/Utils/utils";
const geoCoding = process.env.REACT_APP_GEO_CODING;

const searchAddress = debounce(
  async (search) => (await axios.get(`${geoCoding}&address=${search}`)).data
);

const AddressPicker = ({ initialValue, lat, lng, onChange, disabled }) => {
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    if (initialValue && lat && lng) {
      onChange({ address: initialValue, lat, lng });
    }
  }, [initialValue]);

  const handleSearch = async (search) => {
    const addresses = await searchAddress(search);
    setAddressList(addresses.results);
  };

  const handleSelect = ({ value: index }) => {
    const {
      formatted_address: address,
      geometry: {
        location: { lat, lng },
      },
    } = addressList[index];

    onChange({ address, lat, lng });
  };
  return (
    <Select
      showSearch
      labelInValue
      disabled={disabled}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleSelect}
      notFoundContent={null}
      defaultValue={{
        key: -1,
        label: initialValue,
      }}
    >
      {addressList?.map(({ formatted_address }, index) => (
        <Select.Option key={index}>{formatted_address}</Select.Option>
      ))}
    </Select>
  );
};

export default AddressPicker;
