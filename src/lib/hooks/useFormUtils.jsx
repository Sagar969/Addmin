import { useLocation, useNavigate } from "react-router-dom";

export default function useFormUtils() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goBack = (home) =>
    navigate(
      window.history.state && window.history.state.idx > 0
        ? -1
        : home || "/warehouse/manage"
    );

  const goToEditForm = (currentPath) => {
    const path = currentPath || pathname;
    if (typeof path === "string") navigate(path.replace("/view", "/edit"));
  };

  const goToViewForm = (currentPath) => {
    const path = currentPath || pathname;
    if (typeof path === "string") navigate(path.replace("/edit", "/view"));
  };

  return { goBack, goToViewForm, goToEditForm };
}
