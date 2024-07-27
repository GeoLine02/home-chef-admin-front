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
import validationSchema from "./validationSchema";
import Input from "../../components/ui/Input";
import Upload from "../../components/ui/Upload";
import DropDown from "../../components/ui/DropDown";
import TimeRange from "../../components/ui/TimeRange";
import { MoonLoader } from "react-spinners";

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
    workingDays: selectedWorkingDays,
    restaurantTypes: selectedRestaurantTypes,
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
        workingDays: restaurantByID?.workingDays || [],
        restaurantTypes: restaurantByID.restaurantTypes || [],
        workingFrom: restaurantByID.workingFrom || "",
        workingTill: restaurantByID.workingTill || "",
      });
    }
  }, [restaurantByID, params?.id]);

  useEffect(() => {
    dispatch(getRestaurntTypes());
    dispatch(getWeekDays());
  }, [dispatch]);

  useMemo(() => {
    if (restaurantByID) {
      setSelectedWorkingDays([...restaurantByID.workingDays]);
    }
  }, [restaurantByID]);

  useMemo(() => {
    if (restaurantByID) {
      setWorkingFrom(restaurantByID.workingFrom);
      setWorkingTill(restaurantByID.workingTill);
    }
  }, [restaurantByID]);

  useMemo(() => {
    if (restaurantByID) {
      setSelectedRestaurantTypes([...restaurantByID.restaurantTypes]);
    }
  }, [restaurantByID]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
      await validationSchema.validate(restaurantValues, { abortEarly: false });
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
      formData.append(
        "workingDays",
        JSON.stringify(restaurantValues.workingDays)
      );
      formData.append(
        "restaurantTypes",
        JSON.stringify(restaurantValues.restaurantTypes)
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
      <form onSubmit={onSubmit}>
        <div className="flex gap-6 mt-6 w-full">
          <div className="w-[65%] space-y-2">
            <Input
              name="name"
              onChange={handleChange}
              value={restaurantValues.name}
              required
            />
            {error.name && <p>{error.name}</p>}
            <Input
              name="ownerId"
              onChange={handleChange}
              value={restaurantValues.ownerId}
              required
            />
            {error.ownerId && <p>{error.ownerId}</p>}

            <Input
              name="email"
              onChange={handleChange}
              value={restaurantValues.email}
              required
            />
            {error.email && <p>{error.email}</p>}
            <Input
              name="address"
              onChange={handleChange}
              value={restaurantValues.address}
              required
            />
            {error.address && <p>{error.address}</p>}
            <Input
              name="city"
              onChange={handleChange}
              value={restaurantValues.city}
              required
            />
            {error.city && <p>{error.city}</p>}
            <Input
              name="phone"
              onChange={handleChange}
              value={restaurantValues.phone}
              required
            />
            {error.phone && <p>{error.phone}</p>}
          </div>
          <div className="w-[40%]">
            <Upload value={image} onChange={handleFileChange} />
            {error.file && <p>{error.file}</p>}
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
            <div className="rounded-md bg-green-500 px-3 py-1 cursor-pointer">
              <button type="submit">Submit</button>
              {isLoading && (
                <MoonLoader color="rgba(0, 128, 0, 1)" speedMultiplier={0.4} />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RestaurantEdit;
