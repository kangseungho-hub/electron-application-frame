class ModalManager {
    constructor() {
        this.modalContainer = $(".modal-wrapper")

        this.modals = {
            notice: $(".error-modal")
        }

        this.closeBtns = {
            notice: $(".error-modal .close")
        }

        this.closeBtns.notice.on("click", (e) => {
            this.modalContainer.hide()
        })
    }

    openModal() {
        this.modalContainer.show()
    }

    showNoticeModal(message, closeCb) {
        this.openModal()

        this.modals.notice.find(".body").text(message)
        this.modals.notice.show()

        closeCb()
    }
}

exports.modalmanager = new ModalManager()