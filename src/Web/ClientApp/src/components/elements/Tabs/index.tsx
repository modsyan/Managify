import { useState } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Modal,
  Input,
  Button,
  Checkbox,
} from "rizzui";
import { PlusIcon } from "@heroicons/react/20/solid";
import useUserContext from "../../../hooks/useUserContext";
import { TabType } from "../../../features/maintenance-management/maintenance-tabs-details";
import cn from "../../../utils/class-names";

type NewOptionModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
};

const NewOptionModel: React.FC<NewOptionModelProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    onSave(title);
    setTitle("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="">
      <div className="flex flex-col gap-3 p-3">
        <h2>Add New Option</h2>
        <Input
          type="text"
          placeholder="Option Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex gap-2">
          <Button onClick={handleSave}>Add</Button>
          <Button onClick={onClose} variant="flat">
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export const MyTabs: React.FC<{ tabsData: TabType[] }> = ({ tabsData }) => {
  console.log("RENDERING TABS");

  const [tabs, setTabs] = useState<TabType[]>([...tabsData]);
  const { user } = useUserContext();

  const [activeTab, setActiveTab] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [newTabOptions] = useState([]);
  const [newOptionModalIsOpen, setNewOptionModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openNewOptionModal = () => {
    setNewOptionModalIsOpen(true);
  };

  const closeNewOptionModal = () => {
    setNewOptionModalIsOpen(false);
  };

  const addNewTab = () => {
    const newTab: TabType = {
      id: tabs.length,
      tabName: newTabTitle,
      options: newTabOptions,
      type: tabs[activeTab].type,
    };
    setTabs([...tabs, newTab]);
    closeModal();
  };

  const handleCheckboxChange = (tabIndex: number, optionIndex: number) => {
    console.log("clicked", tabIndex, optionIndex);

    const updatedTabs: TabType[] = [...tabs];
    updatedTabs[tabIndex].options = updatedTabs[tabIndex].options.map(
      (option, index) => {
        if (index === optionIndex) {
          return {
            ...option,
            check: !option.check, // Toggle the checked state
          };
        }
        return option;
      }
    );
    setTabs(updatedTabs);
  };
  // add new option to the current tab
  const addNewOption = (title: string) => {
    const updatedTabs: TabType[] = [...tabs];
    updatedTabs[activeTab].options = [
      ...updatedTabs[activeTab].options,
      { check: false, title },
    ];
    setTabs(updatedTabs);
    closeNewOptionModal();
  };
  return (
    <>
      <div className="p-3 flex flex-col gap-6 bg-gray-50 rounded-md shadow-lg">
        {/* Tabs and Panels */}
        <Tabs defaultIndex={0}>
          <div className="flex flex-row overflow-x-auto">
            {user?.isAdmin && (
              <Button className="mx-2" onClick={openModal}>
                <span>إضافة تاب جديدة</span>{" "}
                <PlusIcon strokeWidth="2" className="h-4 w-4 ml-2" />
              </Button>
            )}
            <TabList
              className="flex space-x-8 border-b border-b-gray-300 flex-grow flex-nowrap"
              style={{ width: `${tabs.length * 120}px` }}
            >
              {tabs.map((tab) => (
                <Tab
                  onClick={() => setActiveTab(tab.id)}
                  key={tab.id}
                  className={({ selected }) =>
                    cn(
                      "relative w-24 py-2 text-sm outline-none",
                      selected
                        ? "font-medium text-gray-900"
                        : "text-gray-500 hover:text-gray-800"
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <p>{tab.tabName}</p>
                      <span
                        className={cn(
                          "absolute left-0 -bottom-px h-0.5 w-full",
                          selected ? "bg-gray-900" : "bg-transparent"
                        )}
                      />
                    </>
                  )}
                </Tab>
              ))}
            </TabList>
          </div>
          {/* Content of Panels */}
          <TabPanels className="mt-2">
            {tabs.map((tab, tabIndex) => (
              <TabPanel
                key={tab.id}
                className="py-2 text-sm leading-6 text-gray-600"
              >
                <div className="gap-3 grid grid-cols-2">
                  {tab.options.map((checkbox, index) => (
                    <label
                      key={index}
                      className=" p-3  flex gap-2 items-center "
                    >
                      <Checkbox
                        type="checkbox"
                        checked={checkbox.check}
                        onChange={() => handleCheckboxChange(tabIndex, index)}
                        className="bg-transparent"
                      />
                      <label htmlFor="">{checkbox.title}</label>
                    </label>
                  ))}
                  {user?.isAdmin && (
                    <Button
                      className="mx-2 w-fit"
                      onClick={openNewOptionModal}
                      variant="outline"
                    >
                      <span>إضافة خيار جديد</span>
                      <PlusIcon strokeWidth="2" className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
        {/* Modal to add new Option */}
        <NewOptionModel
          isOpen={newOptionModalIsOpen}
          onClose={closeNewOptionModal}
          onSave={addNewOption}
        />
        {/* Modal to add new Tab */}
        <Modal isOpen={modalIsOpen} onClose={closeModal} className="">
          <div className="flex flex-col gap-3 p-3">
            <h2>Add New Tab</h2>
            <Input
              type="text"
              placeholder="Tab Title"
              value={newTabTitle}
              onChange={(e) => setNewTabTitle(e.target.value)}
            />

            <div className="flex gap-2">
              <Button onClick={addNewTab}>Add</Button>
              <Button onClick={closeModal} variant="flat">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
