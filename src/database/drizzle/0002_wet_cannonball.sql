CREATE TABLE `reminders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`notification_id` text NOT NULL,
	`note_id` integer NOT NULL,
	`parent_id` integer,
	`title` text NOT NULL,
	`message` text NOT NULL,
	`notificate_at` integer NOT NULL,
	FOREIGN KEY (`note_id`) REFERENCES `notes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`parent_id`) REFERENCES `reminders`(`id`) ON UPDATE no action ON DELETE cascade
);
