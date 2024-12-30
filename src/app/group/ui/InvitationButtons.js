import styles from '@/app/group/modules/styles/invitation-button.module.scss'
import { Typo14 } from '@/app/ui/misc/Typo'

const InvitationButtons = ({ group, onAgree, onRefuse }) => (
  <div className={styles.container}>
    <button
      className={`${styles.button} ${styles.acceptButton}`}
      onClick={(e) => {
        e.stopPropagation()
        onAgree(group.id, group.gmbrSeq)
      }}
    >
      <Typo14>수락</Typo14>
    </button>
    <button
      className={`${styles.button} ${styles.rejectButton}`}
      onClick={(e) => {
        e.stopPropagation()
        onRefuse(group.id, group.gmbrSeq)
      }}
    >
      <Typo14>거절</Typo14>
    </button>
  </div>
)

export default InvitationButtons
