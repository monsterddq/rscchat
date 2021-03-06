USE [ChatDB]
GO
/****** Object:  Table [dbo].[__MigrationHistory]    Script Date: 11/9/2017 1:31:56 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[__MigrationHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ContextKey] [nvarchar](300) NOT NULL,
	[Model] [varbinary](max) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK_dbo.__MigrationHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC,
	[ContextKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Messages]    Script Date: 11/9/2017 1:31:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Messages](
	[MessageId] [int] IDENTITY(1,1) NOT NULL,
	[Time] [datetime] NOT NULL,
	[Content] [nvarchar](max) NULL,
	[UserName] [nvarchar](128) NULL,
	[RoomId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.Messages] PRIMARY KEY CLUSTERED 
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Rooms]    Script Date: 11/9/2017 1:31:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rooms](
	[RoomId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Status] [bit] NOT NULL,
	[Type] [int] NOT NULL,
	[Background] [nvarchar](max) NULL,
	[Time] [datetime] NOT NULL,
 CONSTRAINT [PK_dbo.Rooms] PRIMARY KEY CLUSTERED 
(
	[RoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[UserRooms]    Script Date: 11/9/2017 1:31:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRooms](
	[UserName] [nvarchar](128) NOT NULL,
	[RoomId] [int] NOT NULL,
 CONSTRAINT [PK_dbo.UserRooms] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC,
	[RoomId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/9/2017 1:31:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserName] [nvarchar](128) NOT NULL,
	[Password] [nvarchar](max) NULL,
	[Avatar] [nvarchar](max) NULL,
	[FullName] [nvarchar](max) NULL,
	[Phone] [nvarchar](max) NULL,
	[VerifyEmail] [bit] NOT NULL,
	[Role] [int] NOT NULL,
 CONSTRAINT [PK_dbo.Users] PRIMARY KEY CLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
INSERT [dbo].[__MigrationHistory] ([MigrationId], [ContextKey], [Model], [ProductVersion]) VALUES (N'201709271012055_InitialCreate', N'chat.Models.ChatDbContext', 0x1F8B0800000000000400ED5CDB6EE336107D2FD07F10F4D41659CBCEBE6C037B17592729826E2E88B38BBE2D688976844A944B52A98DA25FD6877E527FA143C9BA5024AD8BAF058A7D4978399CE19C19529CC9FEF3D7DFC30FCB30B05E31657E4446F6A0D7B72D4CDCC8F3C97C64C77CF6E69DFDE1FDB7DF0CAFBD70697DC9C6BD15E360266123FB85F3C585E330F7058788F542DFA5118B66BCE746A183BCC839EFF77F7406030703840D5896357C8A09F7439CFC02BF8E23E2E2058F517017793860EB76E89924A8D63D0A315B20178F6CF705F15E3ACCB62E031F8108131CCC6C0B111271C441C08BCF0C4F388DC87CB28006143CAF1618C6CD50C0F05AF08B6278531DFAE74207A7989841B931E351D81270F076BD294E757AA7ADB5F34D836DBB86EDE52BA175B27523FB0E3386E6A07B75AD8B7140C53869637BEBE16796683CCBED0EF410FFCEAC711CF098E211C131A72838B31EE369E0BB3FE3D573F42B262312074159201009FAA406687AA4D10253BE7AC23359CC5BCFB61C79BA539D9FCF56A7A6FADC12FEF6DCB6EE4114340D706EFD92EE131E51FC132698228EBD47C439A660BC5B0F27FBA7085159F219289CAD760508E9EFCA829B4180FB1C96CB7080B6E07AB67587969F3099F317D00C2D6DEBC65F622F6B59037F263E782A4CE234AE5D075C828A9F362C34387FB783859EA228ACB74205E31EBDFAF3C4281A34DB7AC241D2C95EFC45EAEE1945BFA6036E68143E4541C183A4FDEB248AA92B548E349DCF88CE316F2E8AD8C18DA2A403545144BB5194A45327CAD029BC78A36FA73BD0CCB1C5D8837B75C688B62EDD8C49BBF3E71AF7D88D1F4E40D69865CB7C8C800C88B48E1A62764B17AB207C44EEAF731AC5C4DBBBCADDE2E4463F348685AC53890B5247EE709937CABD99AF7672C742BC662E998D3FB85B162782B33F1FDEE1B1D392E0073A871A12AE1AFEF574DCFA284A4E938281B234798796FE45EFD6F46F43FD93A1FD2973F91131F67B44F71FAA2F5F114774EFCBDC80FA07396D1F5F22B2FF5580BBFE6C751D223FD8F66017FEB8AB98557B50368814BAB8A5C6912691E292B1C8F513312AF2A5A15356EA9A78D6C6389A5AB41C81C1B01032FC050409587E64FFA0EC9409340F8705A80E706057A3CB03B9C201E6D8BA74D3EFFE31622EF234B10596965B2020612AEEA528804F400621CE275C8D5E3E71FD050A36895D99D4E2F81682E54B547BAEF002137173DE6487EDD6CE97A86C56DDDE0C9D1299EA3956D07C131D349C9739B6573A9864D150B339DF3B734CD98B2676DE709F6CC73245FB6D573F00CFA4E7089369F56F138565F357BAE6814CFBA271F2714C27F581C298CE06271FC5A417A63A2AC8CF4D3B6197F448551316FBBDDE60379148B7FAC102916E374F2E0EA5372DF1840C3330CD9E94E183EA6A9A3C2C2FB9E65B0C445C7F8EB1F5FDB66A7F813AC15C661FB3ADE26657E59442211942788F6E7E1A9E6A2683BCA6F9C559588F414D00CAE4D26ECB08A50FFDD218ED4B40D5F87517DA5CE0B2BE0A85EA6EB025142D84C42418D650EFD287825E6FC315ABC1254BD69BD62BADDE8D1A6C5D07BDE50483AAB6F9C4AF3FF34B1217CEB5416FED29BF075BCB990CB3CEEA39547F1275D5593A7BEAD8B241E7ECBB348F964596D949D3CC593ADA31E4A3877768B1F0C9BC949F5EB7589334393D7E33699FBC0D530CC7659A1C6E2E6DBE128F286C4BA557E4113D7CE353C6AF10475324DE09C65EA80E93CE0643CCCCD6AA847FD5565930CD26889FD3499A6CB2E6F85CCFBB018D4271F426091C9528EA4C4B9406A000517316781C0571486AF2CA9BB0D2344519266D698E90E776CB207963739CE24E510632DF34CC48D92DB68C63BAD90A4FA81848B9D12814503E17644A35225C1ACDBAB24D178F1B504D3F6D37FB6842516DDAD69E5936B18C91B5B5607A924D94989EB43447286713CB38E5F67D78DE91189A5F33BA92D4745D6A4054F3D4FFC347E9AABF8D653A5AE5181629324365A4A2B5395296FA29E3646DCD518ACC4E19A7686DA1599ABA91D44A9B9A634889993292D4D186FF01AEB23F387C6052AEB2D521F9EAF995B672751DAEAF91F5F596CABD321D625BB035AFBE27EE949315E338EC8901BDC96FC138F093FB4D36E00E117F86194FD3B6F6797F705EA9DC3C9D2A4A87312FD05CC335A594B2B90E5EDEE88B2DAE2D786A5B5654AAD4F10092EFA0A291BC220A01967E17A2E5F765B02E558B1998E655EB96787839B2FF48665E58B7BF7CCD269F590F14787861F5AD3FD56C7D3B81E4AA92C4080D244967C9726CDCD576C57F1DA8B89B9ABCBD905067EF4EE4914BEDA63EDFAACC2ED175EB22BBAD14EAE09EEDCBD63A90E92895647B0D051D2ACC8E1F0B34D9A10357441536D9726BAB054F5BB98D5CD4B41554B570692B30A938692B244D01529770572E3EAA0F77BB2EF4491FDA0F99BB56B329872CB4307CFFEFB578E7F453DDCD0B768E59A07368AE185E25F65884D3982DFF85C29B6386963C45DEA514E3E4038B39B7736271A551094DA3B0A22D7039A6BD0F1B1CDA58FC148A6194BCA8E111B9FA97B2E65A97F4050C3EC1A6115839BD1F9952DADA4A1863218C0E599FDBD7D5B718A08B2E1D7CD6DB6C0963058D095A85DD6F714D790F8ABC5E93421AA5B8405B5774E4FA1945C8A3AAB6A31299F636AB38A9542B70325530EDEDB51BB55A14BAA8590088BFA5FF9B01823FF3E70584F89F1A0876A5C89B8FB925B3283B022A12654394476D8E3C08CB9794FB33E472E87641DDE48F74BEA0208621D7E1147BB7E421E68B9883CA389C06D21FF28A8364D3FA49358F2CF3F06191FC31CC2E5400317DF114F7403EC67EE0E572DF68BE970D10E2845A3F9F0A5B72F18C3A5FE548F74ACECB04B4DEBEFC607DC6E1220030F64026E81577910D28FB09CF91BBCA923966907A43C8DB3EBCF2D19CA290AD318AF9F02B70D80B97EFFF05BC261385A2440000, N'6.1.3-40302')
SET IDENTITY_INSERT [dbo].[Messages] ON 

INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (1, CAST(N'2017-09-27 17:14:50.753' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (2, CAST(N'2017-09-27 18:07:19.177' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (3, CAST(N'2017-09-27 18:07:19.487' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (4, CAST(N'2017-09-27 18:07:19.783' AS DateTime), N'asdfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (5, CAST(N'2017-09-27 18:07:20.047' AS DateTime), N'sdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (6, CAST(N'2017-09-27 18:07:20.317' AS DateTime), N'asdfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (7, CAST(N'2017-09-27 18:07:20.573' AS DateTime), N'sdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (8, CAST(N'2017-09-27 18:07:20.843' AS DateTime), N'asfd', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (9, CAST(N'2017-09-27 18:07:21.120' AS DateTime), N'asdfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (10, CAST(N'2017-09-27 18:07:21.390' AS DateTime), N'sdfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (11, CAST(N'2017-09-27 18:07:21.647' AS DateTime), N'sdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (12, CAST(N'2017-09-27 18:07:21.927' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (13, CAST(N'2017-09-27 18:07:22.190' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (14, CAST(N'2017-09-27 18:07:22.477' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (15, CAST(N'2017-09-27 18:07:22.767' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (16, CAST(N'2017-09-27 18:07:23.017' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (17, CAST(N'2017-09-27 18:07:23.270' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (18, CAST(N'2017-09-27 18:07:23.523' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (19, CAST(N'2017-09-27 18:07:23.793' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (20, CAST(N'2017-09-27 18:07:24.033' AS DateTime), N'asd', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (21, CAST(N'2017-09-27 18:07:24.270' AS DateTime), N'fas', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (22, CAST(N'2017-09-27 18:07:24.503' AS DateTime), N'dfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (23, CAST(N'2017-09-27 18:07:24.737' AS DateTime), N'sdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (24, CAST(N'2017-09-27 18:07:24.980' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (25, CAST(N'2017-09-27 18:07:25.213' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (26, CAST(N'2017-09-27 18:07:25.463' AS DateTime), N'asd', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (27, CAST(N'2017-09-27 18:07:25.697' AS DateTime), N'fa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (28, CAST(N'2017-09-27 18:07:25.957' AS DateTime), N'sdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (29, CAST(N'2017-09-27 18:07:26.193' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (30, CAST(N'2017-09-27 18:07:26.437' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (31, CAST(N'2017-09-27 18:07:26.693' AS DateTime), N'as', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (32, CAST(N'2017-09-27 18:07:26.933' AS DateTime), N'dfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (33, CAST(N'2017-09-27 18:07:27.163' AS DateTime), N'sdfa', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (34, CAST(N'2017-09-27 18:07:27.410' AS DateTime), N'sdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (35, CAST(N'2017-09-27 18:07:27.670' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (36, CAST(N'2017-09-27 18:07:27.917' AS DateTime), N'asdf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (37, CAST(N'2017-09-28 09:57:46.483' AS DateTime), N'asdas', N'0983406214', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (38, CAST(N'2017-09-28 09:57:53.680' AS DateTime), N'/Content/Image/media.png', N'0983406214', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (39, CAST(N'2017-11-09 09:39:39.853' AS DateTime), N'/Content/Image/logo.png', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (40, CAST(N'2017-11-09 09:51:22.350' AS DateTime), N'ádf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (41, CAST(N'2017-11-09 09:51:23.600' AS DateTime), N'ádf', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (42, CAST(N'2017-11-09 09:51:25.723' AS DateTime), N'hellu', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (43, CAST(N'2017-11-09 09:51:27.950' AS DateTime), N'fuck you', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (44, CAST(N'2017-11-09 09:51:32.127' AS DateTime), N'what the hell', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (45, CAST(N'2017-11-09 09:59:51.910' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (46, CAST(N'2017-11-09 09:59:52.797' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (47, CAST(N'2017-11-09 09:59:53.447' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (48, CAST(N'2017-11-09 09:59:53.977' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (49, CAST(N'2017-11-09 09:59:54.430' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (50, CAST(N'2017-11-09 09:59:54.780' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (51, CAST(N'2017-11-09 09:59:55.180' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (52, CAST(N'2017-11-09 09:59:55.577' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (53, CAST(N'2017-11-09 09:59:55.993' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (54, CAST(N'2017-11-09 09:59:56.433' AS DateTime), N'áda', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (55, CAST(N'2017-11-09 09:59:57.247' AS DateTime), N'ád', N'thaidq@d3plus.com', 1)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (56, CAST(N'2017-11-09 10:10:03.173' AS DateTime), N'ád', N'thaidq@d3plus.com', 4)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (57, CAST(N'2017-11-09 10:19:08.103' AS DateTime), N'ád', N'thaidq@d3plus.com', 5)
INSERT [dbo].[Messages] ([MessageId], [Time], [Content], [UserName], [RoomId]) VALUES (58, CAST(N'2017-11-09 10:19:10.723' AS DateTime), N'ád', N'doanquocthai.it@gmail.com', 5)
SET IDENTITY_INSERT [dbo].[Messages] OFF
SET IDENTITY_INSERT [dbo].[Rooms] ON 

INSERT [dbo].[Rooms] ([RoomId], [Name], [Status], [Type], [Background], [Time]) VALUES (1, N'0-0983406214', 0, 0, N'/Content/Image/login.jpg', CAST(N'2017-09-27 17:12:58.730' AS DateTime))
INSERT [dbo].[Rooms] ([RoomId], [Name], [Status], [Type], [Background], [Time]) VALUES (2, N'1-0989993597', 0, 1, N'#fff', CAST(N'2017-10-31 11:09:06.137' AS DateTime))
INSERT [dbo].[Rooms] ([RoomId], [Name], [Status], [Type], [Background], [Time]) VALUES (3, N'0-0989993597', 0, 0, N'#fff', CAST(N'2017-10-31 11:09:17.060' AS DateTime))
INSERT [dbo].[Rooms] ([RoomId], [Name], [Status], [Type], [Background], [Time]) VALUES (4, N'Làm việc chung', 1, 3, N'/Content/Image/BGd31-1.jpg', CAST(N'2017-11-09 10:02:11.067' AS DateTime))
INSERT [dbo].[Rooms] ([RoomId], [Name], [Status], [Type], [Background], [Time]) VALUES (5, N'0-doanquocthai.it@gmail.com', 0, 0, N'#fff', CAST(N'2017-11-09 10:18:16.447' AS DateTime))
INSERT [dbo].[Rooms] ([RoomId], [Name], [Status], [Type], [Background], [Time]) VALUES (6, N'1-doanquocthai.it@gmail.com', 0, 1, N'#fff', CAST(N'2017-11-09 10:39:27.053' AS DateTime))
SET IDENTITY_INSERT [dbo].[Rooms] OFF
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'0983406214', 1)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'thaidq@d3plus.com', 1)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'0989993597', 2)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'thaidq@d3plus.com', 2)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'0989993597', 3)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'thaidq@d3plus.com', 3)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'thaidq@d3plus.com', 4)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'doanquocthai.it@gmail.com', 5)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'thaidq@d3plus.com', 5)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'doanquocthai.it@gmail.com', 6)
INSERT [dbo].[UserRooms] ([UserName], [RoomId]) VALUES (N'thaidq@d3plus.com', 6)
INSERT [dbo].[Users] ([UserName], [Password], [Avatar], [FullName], [Phone], [VerifyEmail], [Role]) VALUES (N'0983406214', N'ba3253876aed6bc22d4a6ff53d8406c6ad864195ed144ab5c87621b6c233b548baeae6956df346ec8c17f5ea10f35ee3cbc514797ed7ddd3145464e2a0bab413', N' ', N'Dona Quoc Thai', N'0983406214', 0, 1)
INSERT [dbo].[Users] ([UserName], [Password], [Avatar], [FullName], [Phone], [VerifyEmail], [Role]) VALUES (N'0989993597', N'3259242e208669750cad924ac3c3539de9a2679f87eed173d573cffe7fa5b6060365186165123e9b1d7e98898dec09362a8ab88233b186a61c1eaa2dce799af1', N' ', N'D Thang', N'0989993597', 0, 1)
INSERT [dbo].[Users] ([UserName], [Password], [Avatar], [FullName], [Phone], [VerifyEmail], [Role]) VALUES (N'doanquocthai.it@gmail.com', N'fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe', N' ', N'Doan Quoc Thai', N' ', 0, 1)
INSERT [dbo].[Users] ([UserName], [Password], [Avatar], [FullName], [Phone], [VerifyEmail], [Role]) VALUES (N'thaidq@d3plus.com', N'fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe', N'/Content/Image/logo.png', N'Admin', N'0987212122', 1, 0)
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Messages_dbo.Rooms_RoomId] FOREIGN KEY([RoomId])
REFERENCES [dbo].[Rooms] ([RoomId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_dbo.Messages_dbo.Rooms_RoomId]
GO
ALTER TABLE [dbo].[Messages]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Messages_dbo.Users_UserName] FOREIGN KEY([UserName])
REFERENCES [dbo].[Users] ([UserName])
GO
ALTER TABLE [dbo].[Messages] CHECK CONSTRAINT [FK_dbo.Messages_dbo.Users_UserName]
GO
ALTER TABLE [dbo].[UserRooms]  WITH CHECK ADD  CONSTRAINT [FK_dbo.UserRooms_dbo.Rooms_RoomId] FOREIGN KEY([RoomId])
REFERENCES [dbo].[Rooms] ([RoomId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserRooms] CHECK CONSTRAINT [FK_dbo.UserRooms_dbo.Rooms_RoomId]
GO
ALTER TABLE [dbo].[UserRooms]  WITH CHECK ADD  CONSTRAINT [FK_dbo.UserRooms_dbo.Users_UserName] FOREIGN KEY([UserName])
REFERENCES [dbo].[Users] ([UserName])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[UserRooms] CHECK CONSTRAINT [FK_dbo.UserRooms_dbo.Users_UserName]
GO
