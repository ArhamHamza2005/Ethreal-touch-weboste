/* eslint-disable react/prop-types */
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className="bg-white  w-full text-black py-[10px] rounded-lg font-bold"
      >
        Buy now
      </Button>
      <Dialog open={open} handler={handleOpen} className=" bg-[#C2985C]">
        <DialogBody className="">
          <div className="mb-3">
            <input
              type="text"
              name="name"
              value={addressInfo.name}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  name: e.target.value,
                });
              }}
              placeholder="Enter your name"
              className="bg-black border border-[#D6C0B3] text-white font-serif placeholder-white px-2 py-2 w-full rounded-md outline-none "
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="address"
              value={addressInfo.address}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  address: e.target.value,
                });
              }}
              placeholder="Enter your address"
              className=" bg-black border border-[#D6C0B3] text-white font-serif placeholder-white px-2 py-2 w-full rounded-md outline-none "
            />
          </div>

          {
            <div className="mb-3">
              <input
                type="number"
                name="pincode"
                value={addressInfo.pincode}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    pincode: e.target.value,
                  });
                }}
                placeholder="Enter your postal code"
                className="bg-black border border-[#D6C0B3] text-white font-serif placeholder-white px-2 py-2 w-full rounded-md outline-none  "
              />
            </div>
          }

          <div className="mb-3">
            <input
              type="text"
              name="mobileNumber"
              value={addressInfo.mobileNumber}
              onChange={(e) => {
                setAddressInfo({
                  ...addressInfo,
                  mobileNumber: e.target.value,
                });
              }}
              placeholder="Enter your mobileNumber"
              className="bg-black border border-[#D6C0B3] text-white font-serif placeholder-white px-2 py-2 w-full rounded-md outline-none "
            />
          </div>

          <div className="">
            <Button
              type="button"
              onClick={() => {
                handleOpen();
                buyNowFunction();
              }}
              className="w-full px-4 py-3 text-center text-white bg-black border border-[#493628] dark:border-gray-700 rounded-lg font-serif font-bold"
            >
              Buy now
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNowModal;
