import { useCallback, useEffect, useRef, useState } from "react";
import useMountedState from "./useMountedState";

type UseDialogProps = {
  dialogCloseAnimationDuration?: number;
};

const useDialog = ({ dialogCloseAnimationDuration }: UseDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [triggerClose, setTriggerClose] = useState<boolean>(false);
  const mounted = useMountedState();

  const _toggleDialog = useCallback(() => {
    const dialogElement = dialogRef.current;

    if (!mounted || !dialogElement) {
      return;
    }

    if (dialogElement.open) {
      dialogElement.close();
    } else {
      dialogElement.showModal();
    }
  }, [mounted]);

  const openDialog = _toggleDialog;

  const closeDialog = useCallback(() => {
    setTriggerClose(true);

    setTimeout(() => {
      setTriggerClose(false);
      _toggleDialog();
    }, dialogCloseAnimationDuration);
  }, [dialogCloseAnimationDuration, _toggleDialog]);

  const _handleEscape = useCallback((event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (!mounted || !dialogElement) {
      return;
    }

    dialogElement.addEventListener("cancel", _handleEscape);

    return () => dialogElement.removeEventListener("cancel", _handleEscape);
  }, [mounted, _handleEscape]);

  return {
    dialogRef,
    triggerClose,
    openDialog,
    closeDialog,
  };
};

export default useDialog;
