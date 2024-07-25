import Input from "../../components/ui/Input";
import Upload from "../../components/ui/Upload";
import { MdDelete } from "react-icons/md";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DropDown from "../../components/ui/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRestaurntTypes,
  getWeekDays,
} from "../../store/features/restaurantSettingsSlice";
import TimeRange from "../../components/ui/TimeRange";
import { uploadImageToFirebase } from "../../services/restaurants/firebaseApi";

const RestaurantNew = () => {
  const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
  const [imageIntroFile, setImageIntroFile] = useState<File | null>(null);
  const [imageCoverUrl, setImageCoverUrl] = useState<string>("");
  const [imageIntroUrl, setImageIntroUrl] = useState<string>("");

  console.log(imageCoverFile);

  const [selectedWorkingDays, setSelectedWorkingDays] = useState<string[]>([]);
  const [selectRestaurantTypes, setSelectRestaurantTypes] = useState<string[]>(
    []
  );

  const [restaurantValues, setRestaurantValues] = useState({
    name: "",
    ownerId: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    imageCover: imageCoverUrl,
    imageIntro: imageIntroUrl,
    workingDays: selectedWorkingDays,
    restaurantType: selectRestaurantTypes,
  });

  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRestaurntTypes());
    dispatch(getWeekDays());
  }, [dispatch]);

  const restaurnatTypes = useSelector(
    (state: RootState) => state.restaurantSettingsReducer.restaurnatTypes
  );

  const weekDays = useSelector(
    (state: RootState) => state.restaurantSettingsReducer.days
  );

  const daysOptions = weekDays.map((day) => ({
    accessorKey: day.id,
    header: day.days,
  }));

  const restaurantTypesOptions = restaurnatTypes.map((type) => ({
    accessorKey: type.id,
    header: type.typeName,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleWorkingDaysChange = (selected: string[]) => {
    setSelectedWorkingDays(selected);
  };

  const handleRestaurantTypesChange = (selected: string) => {
    const newState = [...selectRestaurantTypes];
    if (newState.includes(selected)) {
      return alert(`this day is alredy exist ${selected}`);
    }
    newState.push(selected);
    setSelectRestaurantTypes(newState);
  };

  const onTimeRangeChange = (start: string, end: string) => {
    setStartTime(start);
    setEndTime(end);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let coverUrl = imageCoverUrl;
    let introUrl = imageIntroUrl;

    if (imageCoverFile) {
      coverUrl = await uploadImageToFirebase(imageCoverFile, "cover");
    }

    if (imageIntroFile) {
      introUrl = await uploadImageToFirebase(imageIntroFile, "intro");
    }

    setRestaurantValues((prevValues) => ({
      ...prevValues,
      imageCover: coverUrl,
      imageIntro: introUrl,
    }));

    const updatedValues = {
      ...restaurantValues,
      imageCover: coverUrl,
      imageIntro: introUrl,
    };

    setRestaurantValues(updatedValues);

    console.log("Before setting state:", updatedValues);
  };

  const handleCoverImageUpload = (file: File | null) => {
    if (file) {
      setImageCoverUrl(URL.createObjectURL(file));
    } else {
      setImageCoverUrl("");
    }
    setImageCoverFile(file);
  };

  const handleIntroImageUpload = (file: File | null) => {
    if (file) {
      setImageIntroUrl(URL.createObjectURL(file));
    } else {
      setImageIntroUrl("");
    }
    setImageIntroFile(file);
  };

  const handleDeleteImage = (type: "cover" | "intro") => {
    if (type === "cover") {
      setImageCoverUrl("");
      setImageCoverFile(null);
    }
    if (type === "intro") {
      setImageIntroUrl("");
      setImageIntroFile(null);
    }
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl text-black">New Restaurant</h1>
      <form onSubmit={onSubmit}>
        <div className="flex gap-6 mt-6 w-full">
          <div className="w-[65%] space-y-2">
            <Input
              name="name"
              onChange={handleChange}
              value={restaurantValues.name}
              required
            />
            <Input
              name="ownerId"
              onChange={handleChange}
              value={restaurantValues.ownerId}
              required
            />
            <Input
              name="email"
              onChange={handleChange}
              value={restaurantValues.email}
              required
            />
            <Input
              name="address"
              onChange={handleChange}
              value={restaurantValues.address}
              required
            />
            <Input
              name="city"
              onChange={handleChange}
              value={restaurantValues.city}
              required
            />
            <Input
              name="phone"
              onChange={handleChange}
              value={restaurantValues.phone}
              required
            />
          </div>

          <div className="w-[40%]">
            <div className="flex gap-1">
              {imageCoverUrl ? (
                <div className="relative group w-full bg-green-100 h-64 p-3 border-2 border-dotted flex items-center justify-center">
                  <img
                    src={imageCoverUrl}
                    alt="Cover"
                    className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleDeleteImage("cover")}
                  >
                    <MdDelete
                      size={28}
                      className="text-slate-50 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <Upload
                  value={imageCoverFile}
                  onChange={handleCoverImageUpload}
                />
              )}
              {imageIntroUrl ? (
                <div className="relative group w-full bg-green-100 h-64 p-3 border-2 border-dotted flex items-center justify-center">
                  <img
                    src={imageIntroUrl}
                    alt="Intro"
                    className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleDeleteImage("intro")}
                  >
                    <MdDelete
                      size={28}
                      className="text-slate-50 cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                <Upload
                  value={imageIntroFile}
                  onChange={handleIntroImageUpload}
                />
              )}
            </div>

            <div className="mt-3">
              <h1 className="mb-2">Working Days</h1>
              <DropDown
                handleWorkingDaysChange={handleWorkingDaysChange}
                options={daysOptions}
                multiple={true}
                selected={selectedWorkingDays}
                setSelected={setSelectedWorkingDays}
                name="workingDays"
              />
            </div>
            <div className="mt-3">
              <h1 className="mb-2">Restaurant Type</h1>
              <DropDown
                handleWorkingDaysChange={handleRestaurantTypesChange}
                options={restaurantTypesOptions}
                selected={selectRestaurantTypes}
                setSelected={setSelectRestaurantTypes}
                multiple
                name="restaurantType"
              />
            </div>
            <div className="mt-3">
              <h1 className="mt-2">Working Hours</h1>
              <TimeRange
                startTimeHeader="Working from"
                endTimeHeader="Working till"
                onChange={onTimeRangeChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full py-4 mt-11 bg-dark_backgorund_color">
          <div className="flex items-center justify-end gap-6 px-14 text-white">
            <button type="reset" className="rounded-md bg-red-500 px-3 py-1">
              Discard
            </button>
            <button type="submit" className="rounded-md bg-green-500 px-3 py-1">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RestaurantNew;
