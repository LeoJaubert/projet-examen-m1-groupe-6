import { FC, ReactElement } from 'react';
import styles from './modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit?: () => void;
  title?: ReactElement | string;
  children: ReactElement;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  children,
  title,
  onSubmit,
  onCancel,
}) => (isOpen ? (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
      <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          x
        </button>
      {title ? <div className={styles.headerTitle}>{title}</div> : undefined}
    </div>
      <hr className={styles.divider} />
      <div className={styles.modalBody}>{children}</div>
      <hr className={styles.divider} />
      <div className={styles.modalFooter}>
      {onSubmit ? (
          <button type="button" className="primary" onClick={onSubmit}>
            Submit
          </button>
        ) : undefined}
    </div>
    </div>
  ) : undefined);
