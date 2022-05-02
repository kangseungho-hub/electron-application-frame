class ModalManager {
    constructor() {
        this.modalContainer = $(".modal-wrapper")

        this.modals = {
            notice: $(".notice-modal")
        }

        this.closeBtns = {
            notice: $(".notice-modal .footer")
        }
    }

    openModal() {
        this.modalContainer.show()
    }

    showNoticeModal(message, closeCb) {
        this.openModal()

        this.modals.notice.find(".body").text(message)
        this.modals.notice.show()

        this.closeBtns.notice.one("click", (e) => {
            this.modalContainer.hide()
        })

        closeCb()
    }
}

exports.modalmanager = new ModalManager()