import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRestaurntTypes,
  getWeekDays,
} from "../../store/features/restaurantSettingsSlice";
import validationSchema from "../../schemas/restaurantValidationSchema";
import { uploadImageToFirebase } from "../../services/firebaseApi";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import validateForm from "../../utils/validateForm";
import RestaurantsForm from "../../components/restaurants/RestaurantsForm";
import { IRestaurantForm } from "../../types/restaurant";
import { createRestaurant } from "../../store/features/restaurantSlice";

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
  const [restaurantValues, setRestaurantValues] = useState<IRestaurantForm>({
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

  const [restaurantErrors, setRestsaurantErrors] = useState({
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
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const restaurantCreationStatus = useSelector(
    (state: RootState) => state.restaurantReducer.restaurantCreationStatus
  );

  useEffect(() => {
    dispatch(getRestaurntTypes());
    dispatch(getWeekDays());
  }, [dispatch]);

  useEffect(() => {
    const { state } = location;
    if (state && state.ownerID) {
      console.log(state.ownerID);
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

  useEffect(() => {
    if (restaurantCreationStatus === "successful") {
      const restaurantCreationToast = () =>
        toast("Restaurant created successfuly!");
      restaurantCreationToast();
    }
  }, [restaurantCreationStatus]);

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

      const { isValid, errors } = await validateForm(
        validationSchema,
        updatedValues
      );

      if (isValid) {
        dispatch(createRestaurant(updatedValues));
      } else {
        setRestsaurantErrors(errors);
      }
    } catch (error) {
      console.log(error);
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
      <RestaurantsForm
        daysOptions={daysOptions}
        handleChange={handleChange}
        handleCoverImageUpload={handleCoverImageUpload}
        handleDeleteImage={handleDeleteImage}
        handleIntroImageUpload={handleIntroImageUpload}
        imageCoverUrl={imageCoverUrl}
        imageIntroUrl={imageIntroUrl}
        isLoading={isLoading}
        onSubmit={onSubmit}
        onTimeRangeChange={onTimeRangeChange}
        restaurantErrors={restaurantErrors}
        restaurantTypesOptions={restaurantTypesOptions}
        restaurantValues={restaurantValues}
        selectedRestaurantTypes={selectedRestaurantTypes}
        selectedWorkingDays={selectedWorkingDays}
        setSelectedRestaurantTypes={setSelectedRestaurantTypes}
        setSelectedWorkingDays={setSelectedWorkingDays}
        workingFrom={workingFrom}
        workingTill={workingTill}
      />
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
