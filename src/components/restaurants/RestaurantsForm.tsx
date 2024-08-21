import { ChangeEvent, FormEvent } from "react";
import { MoonLoader } from "react-spinners";
import Input from "../ui/Input";
import Upload from "../ui/Upload";
import DropDown from "../ui/DropDown";
import TimeRange from "../ui/TimeRange";
import { IRestaurantForm } from "../../types/restaurant";

interface IRestaurantsFormProps {
  restaurantValues: IRestaurantForm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  daysOptions: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restaurantTypesOptions: any[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTimeRangeChange: (start: string, end: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<any>;
  handleCoverImageUpload: (file: File | null) => void;
  handleIntroImageUpload: (file: File | null) => void;
  handleDeleteImage: (type: "cover" | "intro") => void;
  isLoading: boolean;
  restaurantErrors: IRestaurantForm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedWorkingDays: any[] | [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedWorkingDays: React.Dispatch<React.SetStateAction<any[] | []>>;
  selectedRestaurantTypes: number[];
  setSelectedRestaurantTypes: React.Dispatch<React.SetStateAction<number[]>>;
  imageCoverUrl: string;
  imageIntroUrl: string;
  workingFrom: string;
  workingTill: string;
}

const RestaurantsForm = ({
  daysOptions,
  handleChange,
  handleCoverImageUpload,
  handleDeleteImage,
  handleIntroImageUpload,
  onSubmit,
  onTimeRangeChange,
  restaurantErrors,
  restaurantTypesOptions,
  restaurantValues,
  isLoading,
  selectedWorkingDays,
  selectedRestaurantTypes,
  setSelectedRestaurantTypes,
  setSelectedWorkingDays,
  imageCoverUrl,
  imageIntroUrl,
  workingFrom,
  workingTill,
}: IRestaurantsFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-6 mt-6 w-full">
        <div className="w-[65%] space-y-2">
          <Input
            name="name"
            onChange={handleChange}
            value={restaurantValues.name}
            error={restaurantErrors.name}
          />
          <Input
            name="email"
            onChange={handleChange}
            value={restaurantValues.email}
            error={restaurantErrors.email}
          />
          <Input
            name="address"
            onChange={handleChange}
            value={restaurantValues.address}
            error={restaurantErrors.address}
          />
          <Input
            name="city"
            onChange={handleChange}
            value={restaurantValues.city}
            error={restaurantErrors.city}
          />
          <Input
            name="ownerId"
            onChange={handleChange}
            value={restaurantValues.ownerId}
            error={restaurantErrors.ownerId}
          />
          <Input
            name="phone"
            onChange={handleChange}
            value={restaurantValues.phone}
            error={restaurantErrors.phone}
          />
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
            {restaurantErrors.workingDays && (
              <p>{restaurantErrors.workingDays}</p>
            )}
          </div>
          <div className="mt-3">
            <h1 className="mb-2">Restaurant Type</h1>
            <DropDown
              options={restaurantTypesOptions}
              selected={selectedRestaurantTypes}
              setSelected={setSelectedRestaurantTypes}
              multiSelect
            />
            {restaurantErrors.restaurantTypes && (
              <p>{restaurantErrors.restaurantTypes}</p>
            )}
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
            {restaurantErrors.workingFrom && (
              <p>{restaurantErrors.workingFrom}</p>
            )}
            {restaurantErrors.workingTill && (
              <p>{restaurantErrors.workingTill}</p>
            )}
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
  );
};

export default RestaurantsForm;
