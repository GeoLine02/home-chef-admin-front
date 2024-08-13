import Input from "../../components/ui/Input";
import Upload from "../../components/ui/Upload";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import DropDown from "../../components/ui/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRestaurntTypes,
  getWeekDays,
} from "../../store/features/restaurantSettingsSlice";
import TimeRange from "../../components/ui/TimeRange";
import { createRestaurantService } from "../../services/restaurants";
import validationSchema from "./validationSchema";
import * as Yup from "yup";
import { MoonLoader } from "react-spinners";
import { uploadImageToFirebase } from "../../services/firebaseApi";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RestaurantNew = () => {
  const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
  const [imageIntroFile, setImageIntroFile] = useState<File | null>(null);
  const [imageCoverUrl, setImageCoverUrl] = useState<string>("");
  const [imageIntroUrl, setImageIntroUrl] = useState<string>("");

  const [selectedWorkingDays, setSelectedWorkingDays] = useState<[] | any[]>(
    []
  );
  const [selectedRestaurantTypes, setSelectedRestaurantTypes] = useState<
    number[]
  >([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [restaurantValues, setRestaurantValues] = useState({
    name: "",
    ownerId: "",
    countryId: 201,
    latitude: 0.4234234,
    longitude: 0.4234234,
    email: "",
    address: "",
    city: "",
    phone: "",
    imageCover: imageCoverUrl,
    imageIntro: imageIntroUrl,
    workingDays: selectedWorkingDays,
    restaurantTypes: selectedRestaurantTypes,
    workingFrom: "",
    workingTill: "",
  });
  const [workingFrom, setWorkingFrom] = useState("00:00");
  const [workingTill, setWorkingTill] = useState("23:59");
  const [error, setError] = useState<Record<string, string | string[]>>({});
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getRestaurntTypes());
    dispatch(getWeekDays());
  }, [dispatch]);

  useEffect(() => {
    const { state } = location;
    if (state && state.ownerID) {
      const userCreationToast = () => toast("User created successfuly!");
      userCreationToast();
      setRestaurantValues({
        ...restaurantValues,
        ownerId: state.ownerID,
      });
    }
  }, [location, restaurantValues.ownerId]);

  useEffect(() => {
    setRestaurantValues({
      ...restaurantValues,
      workingDays: selectedWorkingDays,
      restaurantTypes: selectedRestaurantTypes,
      workingFrom: workingFrom,
      workingTill: workingTill,
    });
  }, [selectedRestaurantTypes, selectedWorkingDays, workingFrom, workingTill]);

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
  const onTimeRangeChange = (start: string, end: string) => {
    setWorkingFrom(start);
    setWorkingTill(end);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let coverUrl = imageCoverUrl;
      let introUrl = imageIntroUrl;

      if (imageCoverFile) {
        coverUrl = await uploadImageToFirebase(imageCoverFile, "cover");
      }

      if (imageIntroFile) {
        introUrl = await uploadImageToFirebase(imageIntroFile, "intro");
      }

      const updatedValues = {
        ...restaurantValues,
        imageCover: coverUrl,
        imageIntro: introUrl,
      };

      await validationSchema.validate(restaurantValues, { abortEarly: false });
      console.log("form data is valid");

      const formData = new FormData();
      formData.append("name", updatedValues.name);
      formData.append("address", updatedValues.address);
      formData.append("city", updatedValues.city);
      formData.append("countryId", updatedValues.countryId.toString());
      formData.append("latitude", updatedValues.latitude.toString());
      formData.append("longitude", updatedValues.longitude.toString());
      formData.append("ownerId", updatedValues.ownerId.toString());
      formData.append("email", updatedValues.email);
      formData.append("workingFrom", updatedValues.workingFrom);
      formData.append("workingTill", updatedValues.workingTill);
      formData.append("phone", updatedValues.phone);

      if (updatedValues.imageCover && updatedValues.imageIntro) {
        formData.append("coverImage", updatedValues.imageCover);
        formData.append("introImage", updatedValues.imageIntro);
      }

      formData.append("workingDays", JSON.stringify(updatedValues.workingDays));
      formData.append(
        "restaurantTypes",
        JSON.stringify(updatedValues.restaurantTypes)
      );

      const resp = await createRestaurantService(formData);
      return resp?.json();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string | string[]> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setError(validationErrors);
      }
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
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
            />
            {error.name && <p>{error.name}</p>}
            <Input
              name="email"
              onChange={handleChange}
              value={restaurantValues.email}
            />
            {error.email && <p>{error.email}</p>}
            <Input
              name="address"
              onChange={handleChange}
              value={restaurantValues.address}
            />
            {error.address && <p>{error.address}</p>}
            <Input
              name="city"
              onChange={handleChange}
              value={restaurantValues.city}
            />
            {error.city && <p>{error.city}</p>}
            <Input
              name="phone"
              onChange={handleChange}
              value={restaurantValues.phone}
            />
            {error.phone && <p>{error.phone}</p>}
          </div>
          <div className="w-[40%]">
            <div className="flex gap-1">
              <Upload
                name="cover"
                value={imageCoverUrl}
                onChange={handleCoverImageUpload}
                handleDelete={() => handleDeleteImage("cover")}
              />
              <Upload
                name="intro"
                value={imageIntroUrl}
                onChange={handleIntroImageUpload}
                handleDelete={() => handleDeleteImage("intro")}
              />
            </div>

            <div className="mt-3">
              <h1 className="mb-2">Working Days</h1>
              <DropDown
                options={daysOptions}
                multiSelect={true}
                selected={selectedWorkingDays}
                setSelected={setSelectedWorkingDays}
              />
              {error.workingDays && <p>{error.workingDays}</p>}
            </div>
            <div className="mt-3">
              <h1 className="mb-2">Restaurant Type</h1>
              <DropDown
                options={restaurantTypesOptions}
                selected={selectedRestaurantTypes}
                setSelected={setSelectedRestaurantTypes}
                multiSelect
              />
              {error.restaurantTypes && <p>{error.restaurantTypes}</p>}
            </div>
            <div className="mt-3">
              <h1 className="mt-2">Working Hours</h1>
              <TimeRange
                minTime={workingFrom}
                maxTime={workingTill}
                startTimeHeader="Working from"
                endTimeHeader="Working till"
                onChange={onTimeRangeChange}
              />
              {error.workingFrom && <p>{error.workingFrom}</p>}
              {error.workingTill && <p>{error.workingTill}</p>}
            </div>
          </div>
        </div>
        <div className="w-full py-4 mt-11 bg-dark_backgorund_color">
          <div className="flex items-center justify-end gap-6 px-14 text-white">
            <button type="reset" className="rounded-md bg-red-500 px-3 py-1">
              Discard
            </button>
            <div className="flex items-center gap-2 rounded-md bg-green-500 px-3 py-1">
              <button type="submit">Submit</button>
              {isLoading && (
                <MoonLoader
                  size={15}
                  color="rgba(0, 128, 0, 1)"
                  speedMultiplier={0.4}
                />
              )}
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default RestaurantNew;
