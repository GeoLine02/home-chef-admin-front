import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRestaurntTypes,
  getWeekDays,
} from "../../store/features/restaurantSettingsSlice";
import { useParams } from "react-router-dom";
import {
  fetchRestaurantByID,
  updateRestaurant,
} from "../../store/features/restaurantSlice";
import RestaurantsForm from "../../components/restaurants/RestaurantsForm";
import { IRestaurantForm } from "../../types/restaurant";
import { uploadImageToFirebase } from "../../services/firebaseApi";
import validateForm from "../../utils/validateForm";
import restaurantValidationSchema from "../../schemas/restaurantValidationSchema";
import { toast, ToastContainer } from "react-toastify";

const RestaurantEdit = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedWorkingDays, setSelectedWorkingDays] = useState<[] | any[]>(
    []
  );

  const [selectedRestaurantTypes, setSelectedRestaurantTypes] = useState<
    number[]
  >([]);
  const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
  const [imageIntroFile, setImageIntroFile] = useState<File | null>(null);
  const [imageCoverUrl, setImageCoverUrl] = useState<string>("");
  const [imageIntroUrl, setImageIntroUrl] = useState<string>("");

  const [restaurantValues, setRestaurantValues] = useState<IRestaurantForm>({
    name: "",
    ownerId: 1,
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

  const [restaurantErrors, setRestsaurantErrors] = useState<IRestaurantForm>({
    name: "",
    ownerId: undefined,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const restaurantByID = useSelector(
    (state: RootState) => state.restaurantReducer.restaurantById
  );
  const restaurnatTypes = useSelector(
    (state: RootState) => state.restaurantSettingsReducer.restaurnatTypes
  );

  const restaurantTypesOptions = restaurnatTypes.map((type) => ({
    accessorKey: type.id,
    header: type.typeName,
  }));

  const weekDays = useSelector(
    (state: RootState) => state.restaurantSettingsReducer.days
  );

  const daysOptions = weekDays.map((day) => ({
    accessorKey: day.id,
    header: day.days,
  }));
  const restaurantUpdateStatus = useSelector(
    (state: RootState) => state.restaurantReducer.restaurantUpdateStatus
  );

  useEffect(() => {
    if (restaurantUpdateStatus === "successful") {
      const restaurantUpadeToast = () =>
        toast("Restaurant updated successfuly");
      restaurantUpadeToast();
    }
  }, [restaurantUpdateStatus]);

  useEffect(() => {
    dispatch(fetchRestaurantByID(parseInt(params.id as string)));
  }, [params?.id, dispatch]);
  useEffect(() => {
    if (restaurantByID) {
      setRestaurantValues({
        name: restaurantByID.name || "",
        ownerId: restaurantByID.ownerId || undefined,
        countryId: 201,
        latitude: restaurantByID.latitude || null,
        longitude: restaurantByID.longitude || null,
        email: restaurantByID.email || "",
        address: restaurantByID.address || "",
        city: restaurantByID.city || "",
        phone: restaurantByID.phone || "",
        imageCover: restaurantByID.coverImage,
        imageIntro: restaurantByID.introImage,
        restaurantTypes: restaurantByID.restaurantTypes,
        workingDays: restaurantByID.workingDays,
        workingFrom: restaurantByID.workingFrom || "",
        workingTill: restaurantByID.workingTill || "",
      });
    }
  }, [restaurantByID, params?.id]);

  useEffect(() => {
    if (restaurantByID?.workingDays) {
      setSelectedWorkingDays([...restaurantByID.workingDays]);
    }
  }, [restaurantByID?.workingDays]);

  useEffect(() => {
    dispatch(getRestaurntTypes());
    dispatch(getWeekDays());
  }, [dispatch]);

  useEffect(() => {
    if (restaurantByID && !selectedWorkingDays.length) {
      setSelectedWorkingDays([...restaurantByID.workingDays]);
    }
  }, [restaurantByID, selectedWorkingDays.length]);

  useEffect(() => {
    if (restaurantByID) {
      setWorkingFrom(restaurantByID.workingFrom);
      setWorkingTill(restaurantByID.workingTill);
    }
  }, [restaurantByID, params?.id]);

  useEffect(() => {
    if (restaurantByID && !selectedRestaurantTypes.length) {
      setSelectedRestaurantTypes([...restaurantByID.restaurantTypes]);
    }
  }, [restaurantByID, selectedRestaurantTypes.length, params?.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRestaurantValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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

  const onTimeRangeChange = (start: string, end: string) => {
    setWorkingFrom(start);
    setWorkingTill(end);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      let coverUrl = imageCoverUrl;
      let introUrl = imageIntroUrl;

      if (imageCoverFile && imageIntroFile) {
        coverUrl = await uploadImageToFirebase(imageCoverFile, "cover");
        introUrl = await uploadImageToFirebase(imageIntroFile, "intro");
      }

      const combinedValues = {
        ...restaurantValues,
        imageCover: coverUrl,
        imageIntro: introUrl,
      };

      const { isValid, errors } = await validateForm(
        restaurantValidationSchema,
        combinedValues
      );

      if (isValid) {
        dispatch(
          updateRestaurant({
            restaurantID: parseInt(params?.id as string),
            restaurantValues: combinedValues,
          })
        );
      } else {
        setRestsaurantErrors(errors);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl text-black">Edit Restaurant</h1>
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

export default RestaurantEdit;
