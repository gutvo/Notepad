PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_configs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`type` text NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_configs`("key", "type", "value") SELECT "key", "type", "value" FROM `configs`;--> statement-breakpoint
DROP TABLE `configs`;--> statement-breakpoint
ALTER TABLE `__new_configs` RENAME TO `configs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `configs_key_unique` ON `configs` (`key`);