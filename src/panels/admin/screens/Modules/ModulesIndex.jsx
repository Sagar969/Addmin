import { Button, Card } from "antd";
import {
  LuExternalLink,
  LuEye,
  LuPencil,
  LuPlus,
  LuView,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { ModuleStaticData } from "../../../../lib/data/StaticData";
import PageTitle from "../../../../components/template/PageTitle";
import { useAdminContext } from "../../../../contexts/AdminContext";

export default function ModulesIndex() {
  const { modules } = useAdminContext();
  const navigate = useNavigate();
  return (
    <>
      <div className="h-full">
        <PageTitle
          title="All Modules"
          caption="Manage all your custom modules"
          extra={
            <Button
              type="primary"
              icon={<LuPlus />}
              onClick={() => navigate("new")}
            >
              New
            </Button>
          }
        />
        {modules.length ? (
          <div className="flex flex-col py-3 px-3">
            {modules.map((module, i) => (
              <div
                key={i}
                className="flex items-center gap-10 justify-between p-4 bg-white rounded-lg filter"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {module.moduleName}
                  </h3>
                  <p className="opacity-70">{module.moduleDescription}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => navigate(`/${module.moduleKey}`)}
                    icon={<LuExternalLink />}
                  />
                  {module.status === ModuleStaticData.moduleStatuses[0] && (
                    <Button
                      onClick={() => navigate(`edit/${module.moduleKey}`)}
                      icon={<LuPencil />}
                    />
                  )}
                  <Button
                    icon={<LuEye />}
                    onClick={() => navigate(`view/${module.moduleKey}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Modules found</p>
        )}
      </div>
    </>
  );
}
