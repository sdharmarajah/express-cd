BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[questions] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [Answer Index] NVARCHAR(1000) NOT NULL,
    [Area] NVARCHAR(1000) NOT NULL,
    [image_in_question] BIT NOT NULL CONSTRAINT [questions_image_in_question_df] DEFAULT 0,
    [image_in_answers] BIT NOT NULL CONSTRAINT [questions_image_in_answers_df] DEFAULT 0,
    [Q Image description] NVARCHAR(1000) NOT NULL,
    [English translation of question] NVARCHAR(1000) NOT NULL,
    [Sinhala translation of question] NVARCHAR(1000),
    [Tamil translation of question] NVARCHAR(1000),
    [English Translation of Answer 1] NVARCHAR(1000),
    [Sinhala Translation of Answer 1] NVARCHAR(1000),
    [Tamil Translation of Answer 1] NVARCHAR(1000),
    [English Translation of Answer 2] NVARCHAR(1000),
    [Sinhala Translation of Answer 2] NVARCHAR(1000),
    [Tamil Translation of Answer 2] NVARCHAR(1000),
    [English Translation of Answer 3] NVARCHAR(1000),
    [Sinhala Translation of Answer 3] NVARCHAR(1000),
    [Tamil Translation of Answer 3] NVARCHAR(1000),
    [Description of Answer Image 1] NVARCHAR(1000),
    [Description of Answer Image 2] NVARCHAR(1000),
    [Description of Answer Image 3] NVARCHAR(1000),
    [V Text] NVARCHAR(1000) NOT NULL,
    [V Text Si] NVARCHAR(1000),
    [V Text Ta] NVARCHAR(1000),
    [V Image Steps] NVARCHAR(1000),
    [A Text] NVARCHAR(1000) NOT NULL,
    [A Text Si] NVARCHAR(1000),
    [A Text Ta] NVARCHAR(1000),
    [K Text] NVARCHAR(1000) NOT NULL,
    [K Text Si] NVARCHAR(1000),
    [K Text Ta] NVARCHAR(1000),
    [quiz_id] INT,
    [status] NVARCHAR(1000) NOT NULL CONSTRAINT [questions_status_df] DEFAULT 'INCOMPLETE',
    [rejected] BIT NOT NULL CONSTRAINT [questions_rejected_df] DEFAULT 0,
    CONSTRAINT [questions_pkey] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[Quiz] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Quiz_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [password] NVARCHAR(1000) NOT NULL,
    [role] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Token] (
    [id] INT NOT NULL IDENTITY(1,1),
    [token] NVARCHAR(1000) NOT NULL,
    [blacklisted] BIT NOT NULL,
    [expires] DATETIME2 NOT NULL,
    [userId] INT NOT NULL,
    CONSTRAINT [Token_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[questions] ADD CONSTRAINT [questions_quiz_id_fkey] FOREIGN KEY ([quiz_id]) REFERENCES [dbo].[Quiz]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Token] ADD CONSTRAINT [Token_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
