import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
import Input from "../../components/ui/Input";
import Upload from "../../components/ui/Upload";
import { useEffect, useState } from "react";
import DropDown from "../../components/ui/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRestaurntTypes,
  getWeekDays,
} from "../../store/features/restaurantSettingsSlice";

export interface IFormValues {
  "restaurant name": string;
  "owner ID": number;
  address: string;
  city: string;
  email: string;
  phone: string;
}

const RestaurantNew = () => {
  const { register, handleSubmit } = useForm<IFormValues>();

  const [image, setImage] = useState(null);
  const [selectedWorkingDays, setSelectedWorkingDays] = useState<
    string | string[]
  >("" || []);
  const [selectRestaurantTypes, setSelectRestaurantTypes] = useState<
    string | string[]
  >("" || []);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getRestaurntTypes());
  }, [dispatch]);

  useEffect(() => {
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

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    console.log(JSON.stringify(data));
  };

  const handleWorkingDaysChange = (selected: string | string[]) => {
    console.log(selected);
  };

  const handleRestaurantTypesChange = (selected: string | string[]) => {
    console.log(selected);
  };

  return (
    <div className="p-5">
      <h1 className="font-bold text-3xl text-black">New Restaurant</h1>
      <form
        className="flex gap-6 mt-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-[65%] space-y-2">
          <div>
            <Input label="restaurant name" register={register} required />
          </div>
          <div>
            <Input label="owner ID" register={register} required />
          </div>
          <div>
            <Input label="email" register={register} required />
          </div>
          <div>
            <Input label="address" register={register} required />
          </div>
          <div>
            <Input label="city" register={register} required />
          </div>
          <div>
            <Input label="phone" register={register} required />
          </div>
        </div>
        <div className="w-[40%]">
          <Upload image={image} setImage={setImage} />
          <div className="mt-3">
            <h1 className="mb-2">Working Days</h1>
            <DropDown
              onChange={handleWorkingDaysChange}
              options={daysOptions}
              multiple={true}
              selected={selectedWorkingDays}
              setSelected={setSelectedWorkingDays}
            />
          </div>
          <div className="mt-3">
            <h1 className="mb-2">Restaurant type</h1>
            <DropDown
              onChange={handleRestaurantTypesChange}
              options={restaurantTypesOptions}
              selected={selectRestaurantTypes}
              setSelected={setSelectRestaurantTypes}
              multiple={true}
            />
          </div>
          <div className="mt-3">
            <h1 className="mt-2">Working hours</h1>
          </div>
        </div>
      </form>
      <div className="w-full py-4 bg-dark_backgorund_color">
        <div className="flex items-center justify-end gap-6 px-14 text-white">
          <button className="rounded-md bg-red-500 px-3 py-1">Discard</button>
          <button className="rounded-md bg-green-500 px-3 py-1">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantNew;
