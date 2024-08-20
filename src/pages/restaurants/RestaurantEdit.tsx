import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRestaurntTypes,
  getWeekDays,
} from "../../store/features/restaurantSettingsSlice";
import { useParams } from "react-router-dom";
import { fetchRestaurantByID } from "../../store/features/restaurantSlice";
import { updateRestaurantService } from "../../services/restaurants";
import * as Yup from "yup";
import validationSchema from "../../schemas/restaurantValidationSchema";
import Input from "../../components/ui/Input";
import Upload from "../../components/ui/Upload";
import DropDown from "../../components/ui/DropDown";
import TimeRange from "../../components/ui/TimeRange";
import { MoonLoader } from "react-spinners";
import RestaurantsForm from "../../components/restaurants/RestaurantsForm";

const RestaurantEdit = () => {
  const [image, setImage] = useState<File | string | null>(null);
  const [selectedWorkingDays, setSelectedWorkingDays] = useState<[] | any[]>(
    []
  );

  const [selectedRestaurantTypes, setSelectedRestaurantTypes] = useState<
    number[]
  >([]);
  const [restaurantValues, setRestaurantValues] = useState<any>({
    name: "",
    ownerId: "",
    countryId: 201,
    latitude: 0.4234234,
    longitude: 0.4234234,
    email: "",
    address: "",
    city: "",
    phone: "",
    file: image,
    workingFrom: "",
    workingTill: "",
  });
  const [workingFrom, setWorkingFrom] = useState("00:00");
  const [workingTill, setWorkingTill] = useState("23:59");
  const [error, setError] = useState<Record<string, string | string[]>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  const restaurantByID = useSelector(
    (state: RootState) => state.restaurantReducer.restaurantById
  );
  console.log("selectedRestaurantTypes", selectedRestaurantTypes);
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

  useEffect(() => {
    dispatch(fetchRestaurantByID(parseInt(params.id as string)));
  }, [params?.id, dispatch]);

  useEffect(() => {
    if (restaurantByID) {
      setRestaurantValues({
        name: restaurantByID.name || "",
        ownerId: restaurantByID.ownerId || "",
        countryId: 201,
        latitude: restaurantByID.latitude || 0.4234234,
        longitude: restaurantByID.longitude || 0.4234234,
        email: restaurantByID.email || "",
        address: restaurantByID.address || "",
        city: restaurantByID.city || "",
        phone: restaurantByID.phone || "",
        file: restaurantByID.img || null,
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

  console.log("selectedWorkingDays", selectedWorkingDays);

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
    console.log("name", name);
    console.log("value", value);
    setRestaurantValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setImage(file);
    setRestaurantValues((prevValues) => ({
      ...prevValues,
      file: file,
    }));
  };

  const onTimeRangeChange = (start: string, end: string) => {
    setWorkingFrom(start);
    setWorkingTill(end);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const combinedValues = {
        ...restaurantValues,
        restaurantTypes: selectedRestaurantTypes,
        workingDays: selectedWorkingDays,
      };

      await validationSchema.validate(combinedValues, { abortEarly: false });
      console.log("form data is valid");
      const formData = new FormData();
      formData.append("name", restaurantValues.name);
      formData.append("address", restaurantValues.address);
      formData.append("city", restaurantValues.city);
      formData.append("countryId", restaurantValues.countryId.toString());
      formData.append("latitude", restaurantValues.latitude.toString());
      formData.append("longitude", restaurantValues.longitude.toString());
      formData.append("ownerId", restaurantValues.ownerId.toString());
      formData.append("email", restaurantValues.email);
      formData.append("workingFrom", restaurantValues.workingFrom);
      formData.append("workingTill", restaurantValues.workingTill);
      formData.append("phone", restaurantValues.phone);
      if (restaurantValues.file) {
        formData.append("file", restaurantValues.file);
      }
      formData.append("workingDays", JSON.stringify(selectedWorkingDays));
      formData.append(
        "restaurantTypes",
        JSON.stringify(selectedRestaurantTypes)
      );
      const resp = await updateRestaurantService(
        parseInt(params?.id as string),
        formData
      );
      return resp?.json();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string | string[]> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = error.message;
          }
        });
        setError(validationErrors);
      }
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
    </div>
  );
};

export default RestaurantEdit;
